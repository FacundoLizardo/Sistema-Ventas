"use server";

export const getProductsService = async ({
  token,
  companyId,
}: {
  token?: string;
  companyId: string;
}) => {
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?companyId=${companyId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("response status:", response.status);

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
