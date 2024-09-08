"use server";

import { CompanyInterface } from "@/types";
import { cookies } from "next/headers";

export const getCompanyService = async (id: string): Promise<{
    sucess: boolean;
    company?: CompanyInterface;
}> => {
  try {
    const cookiesInstance = cookies();
    const token = cookiesInstance.get("token")?.value;

    if (!token) {
      console.error("No token provided");
      return { sucess: false, company:undefined };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Network response was not ok");
      return { sucess: false, company:undefined };
    }

    const company = (await response.json())
    return company;
  } catch (error) {
    console.error("Error fetching companies:", error);
    return { sucess: false, company:undefined };
  }
};
