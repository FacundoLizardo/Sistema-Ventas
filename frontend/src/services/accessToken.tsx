"use server";
import { cookies } from "next/headers";

export const accessToken = (): string => {
  const cookieStore = cookies();
  const cookieValue = cookieStore.get("session")?.value;

  if (!cookieValue) {
    throw new Error("No session cookie found");
  }

  let parsedCookie;
  try {
    parsedCookie = JSON.parse(cookieValue);
  } catch (error) {
    throw new Error("Failed to parse session cookie value");
  }

  const token = parsedCookie.dataUser?.token;

  if (!token) {
    throw new Error("No token found in session cookie");
  }

  return token;
};
