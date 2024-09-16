'use server';
import { cookies } from "next/headers";

interface ICompanyuCreationServiceParams {
    name: string;
    address?: string;
    country?: string;
    phoneNumbers?: string[];
    cuit?: string;
    isActive: boolean;
  }

export const postCompanyService = async (
  params: ICompanyuCreationServiceParams
) => {
  console.log({params});
  
  try {
    const cookiesInstance = cookies();
    const token = cookiesInstance.get("token")?.value;    

    if (!token) {
      throw new Error("No token provided");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error posting company:", error);
    throw error;
  }
};
