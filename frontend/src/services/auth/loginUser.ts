"use server";

import { cookies } from "next/headers";

export async function loginUser(email: string, password: string) {
  try {
    const cookieStore = cookies();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        return { success: false, error: "Correo o contraseña incorrectos." };
      }
      return { success: false, error: "Error en la autenticación." };
    }

    const data = await response.json();

    cookieStore.set("session", JSON.stringify(data), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    return data;
  } catch (error) {
    console.error("Error during authentication:", error);
    return { success: false, error: "Error en la autenticación." };
  }
}
