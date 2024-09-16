"use server";
import { cookies } from "next/headers";

export const accessToken = () => {
  const cookieStore = cookies();
  const cookieValue = cookieStore.get("session")?.value;

  if (cookieValue) {
    const parsedCookie = JSON.parse(cookieValue);

    const token = parsedCookie.dataUser?.token;

    return token;
  }
};
