"use server";

export const getCompaniesService = async ({
  token,
}: {
  token: string;
}) => {
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
