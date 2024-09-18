'use server';
import { cookies } from "next/headers";

interface IBranchCreationServiceParams {
  ptoVta: number;
  afipId?: string;
  name: string;
  location: string;
  isStorage?: boolean;
  enable?: boolean;
  manager?: string[];
  hours?: string;
  phoneNumber?: string;
  companyId: string;
}

export const postBranchService = async (
  params: IBranchCreationServiceParams
) => {
  
  try {
    const cookiesInstance = cookies();
    const token = cookiesInstance.get("token")?.value;

    if (!token) {
      throw new Error("No token provided");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/branches`,
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
    console.error("Error posting branch:", error);
    throw error;
  }
};
