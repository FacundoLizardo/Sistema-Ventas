"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getUserSession = async ({ token }: { token: string }) => {
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const cookiesStore = cookies();
    const session = cookiesStore.get("session")?.value;

    if (!session) {
      redirect(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/`);
    }

    const sessionData = JSON.parse(session);
    const { dataUser } = sessionData;
    const { userId, companyId, branchId, role } = dataUser;

    const isAdmin = sessionData && sessionData.dataUser.role === "SUPER_ADMIN";

    return {
      userId,
      companyId,
      branchId,
      role,
      isAdmin,
    };
  } catch (error) {
    console.error("Error getting session:", error);
    throw error;
  }
};
