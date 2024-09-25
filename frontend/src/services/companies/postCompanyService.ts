"use server";

import { ICompanyCreate } from "./companiesServices";

export const postCompanyService = async (
  params: ICompanyCreate,
  token: string
) => {
  try {

    console.log({params});
    
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
    console.error("Error fetching products:", error);
    throw error;
  }
};
