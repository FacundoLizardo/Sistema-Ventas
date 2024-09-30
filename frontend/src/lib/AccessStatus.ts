"use server";
import { cookies } from "next/headers";

export const setAccessCookie = () => {
  const cookieStore = cookies();
  cookieStore.set("isAuthenticated", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600000,
  });
};

export const deleteAccessCookie = () => {
  const cookieStore = cookies();
  cookieStore.delete("isAuthenticated");
};
