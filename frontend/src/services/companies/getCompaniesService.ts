"use server";

import { CompanyInterface } from "@/types";
import { cookies } from "next/headers";

export const getCompaniesService = async (): Promise<{
    sucess: boolean;
    companies: CompanyInterface[];
}> => {
  try {
    const cookiesInstance = cookies();
    const token = cookiesInstance.get("token")?.value;

    if (!token) {
      console.error("No token provided");
      return { sucess: false, companies: [] };
    }

    const userId = cookiesInstance.get("userId")?.value;
    if (!userId) {
      console.error("No userId provided");
      return { sucess: false, companies: [] };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies/companies/${userId}`,
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
      return { sucess: false, companies: [] };
    }

    const companies = (await response.json())
    return companies;
  } catch (error) {
    console.error("Error fetching companies:", error);
    return { sucess: false, companies: [] };
  }
};
