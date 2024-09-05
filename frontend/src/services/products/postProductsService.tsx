'use server';
import { cookies } from "next/headers";

interface IproductCreationServiceParams {
  name: string;
  stock?: number | undefined; 
  allowNegativeStock: boolean;
  trackStock: boolean;
  minimumStock?: number | undefined;
  enabled: boolean;
  notesDescription?: string | undefined;
  taxes?: number | undefined;
  barcode?: string | undefined;
  category?: string | undefined;
  cost?: number | undefined;
  finalPrice?: number | undefined;
  discount?: number | undefined;
  profitPercentage?: number | undefined;
}

export const postProductService = async (
  params: IproductCreationServiceParams
) => {
  try {
    const cookiesInstance = cookies();
    const token = cookiesInstance.get("token")?.value;

    if (!token) {
      throw new Error("No token provided");
    }

    console.log({params});
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`,
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
