import { authenticateUser } from "./authenticateUser";

export async function login(email: string, password: string) {
  try {
    const user = await authenticateUser(email, password);
    return user;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

