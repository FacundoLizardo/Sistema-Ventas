import { redirect } from "next/navigation";
import { loginUser } from "./loginUser";
import { logoutUser } from "./logoutUser";

export async function login(email: string, password: string) {
  try {
    const user = await loginUser(email, password);
    return user;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export async function logout() {
  try {
    const response = await logoutUser();

    if(!response.ok) {
      throw new Error("Logout failed");
    }

    redirect("/");

  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
}
