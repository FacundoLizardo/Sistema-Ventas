"use server";

import { IProductCreate } from "./ProductsServices";

export const putProductService = async ({
  params,
  token,
  productId
}: {
  params: IProductCreate;
  token: string;
  productId: string;
}) => {
  try {
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      }
    );

  if (!response.ok) {
    const errorData = await response.json(); 
    console.error("Error updating product:", errorData);
    throw new Error(errorData.message || "Error updating product");
  }
  
  return true;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};
