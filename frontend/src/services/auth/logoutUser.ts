"use server";

import { cookies } from "next/headers";

export async function logoutUser() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth//logout`, {
      method: "POST",
    });

    const cookieStore = cookies();

    cookieStore.set("session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: -1,
    }); 

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
}
