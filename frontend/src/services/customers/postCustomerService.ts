"use server";

import { ICustomerCreate } from "./CustomersServices";

export const postCustomerService = async ({
  params,
  companyId,
  token,
}: {
  params: ICustomerCreate;
  companyId: string;
  token: string;
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customers/${companyId}`,
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
    console.error("Error posting product:", error);
    throw error;
  }
};
