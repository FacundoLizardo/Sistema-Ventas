'use server';
import { cookies } from "next/headers";

interface IUserCreationServiceParams {
  companyId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address?: string;
  phoneNumber?: string;
  cuit?: string;
  enabled: boolean;
  role: string;
}

export const postUserService = async (
  params: IUserCreationServiceParams
) => {
  console.log({params});
  
  try {
    const cookiesInstance = cookies();
    const token = cookiesInstance.get("token")?.value;

    const {companyId, ...userData} = params

    console.log({userData});
    

    if (!token) {
      throw new Error("No token provided");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${companyId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error posting user:", error);
    throw error;
  }
};
