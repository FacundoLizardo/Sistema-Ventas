"use server";

import { IUser } from "../users/UsersServices";
import { cookies } from "next/headers";

export const putUserService = async ({
  token,
  userId,
  data,
}: {
  token: string;
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

    const updatedUser = await response.json();
    const sessionCookie = cookies().get("session")?.value;

    if (sessionCookie) {
      const sessionData = JSON.parse(sessionCookie);
      
      if (sessionData.dataUser.userId === userId) {
        sessionData.dataUser = {
          ...sessionData.dataUser,
          branchId:
            updatedUser.newUser.branchId || sessionData.dataUser.branchId,
        };

        cookies().set("session", JSON.stringify(sessionData), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 3600,
        });
      }
    }

    return updatedUser;
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    throw error;
  }
};
