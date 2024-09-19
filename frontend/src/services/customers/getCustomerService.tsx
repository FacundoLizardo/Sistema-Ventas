"use server";

export const getCustomerService = async ({
  token,
  companyId,
  docTipo,
  docNro
}: {
  token?: string;
  companyId: string;
  docTipo: string;
  docNro: string;
}) => {
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customers?companyId=${companyId}&docTipo=${docTipo}&docNro=${docNro}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
