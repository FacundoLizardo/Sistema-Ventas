"use server";

import { IProductCreate } from "./ProductsServices";

export const postProductService = async ({
  params,
  companyId,
  token,
}: {
  params: IProductCreate;
  companyId: string;
  token: string;
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${companyId}`,
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
      console.error(response.statusText);
      throw new Error("Network response was not ok");
    }

    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error posting product:", error);
    throw error;
  }
};
