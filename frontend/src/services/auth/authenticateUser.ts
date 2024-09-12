"use server";

import { cookies } from "next/headers";

export async function authenticateUser(email: string, password: string) {
  try {
    const cookieStore = cookies();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const { token, ...restData } = data;
    const userId = restData.dataUser.id;

    cookieStore.set("session", JSON.stringify(data), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
    });

    cookieStore.set("userId", userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
    });

    return data;
  } catch (error) {
    console.error("Error during authentication:", error);
    throw error;
  }
}
