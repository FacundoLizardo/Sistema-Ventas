"use server";

import { ISubCategoryCreate } from "./SubCategoriesServices";

export const postSubCategoryService = async ({
  token,
  companyId,
  params,
}: {
  token: string;
  companyId: string;
  params: ISubCategoryCreate;
}) => {
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/subCategories/${companyId}`,
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
    console.error("Error posting branch:", error);
    throw error;
  }
};
