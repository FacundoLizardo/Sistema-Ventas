"use server";

import { ICompanyCreate } from "./CompaniesServices";

export const postCompanyService = async ({
  params,
}: {
  params: ICompanyCreate;
}) => {
  const tokenFrontend = process.env.NEXT_PUBLIC_TOKEN_FRONTEND;

  if (!tokenFrontend) {
    throw new Error("No token provided");
  }
const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/initialApp/company`
console.log("url", url);

  try {
    const response = await fetch(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      }
    );

    console.log("response", response);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }


    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error posting product:", error);
    throw error;
  }
};
