"use server";

import { IUser } from "./UsersServices";

export const putUserService = async ({
  token,
  userId,
  data,
}: {
  token?: string;
  userId: string;
  data: Partial<IUser>;
}) => {
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users?userId=${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
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
