"use server";

export const getOperationsService = async ({
  token,
  companyId,
  startDate,
  endDate,
}: {
  token: string;
  companyId: string;
  startDate: string;
  endDate?: string;
}) => {
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const queryParams = new URLSearchParams();

    if (companyId) {
      queryParams.append("companyId", companyId);
    }

    if (startDate) {
      queryParams.append("startDate", startDate);
    }

    if (endDate) {
      queryParams.append("endDate", endDate);
    }

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }/api/operations?${queryParams.toString()}`,
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
