import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPage({
  params,
}: {
  params: { locale: string };
}) {
  const cookiesStore = cookies();
  const session = cookiesStore.get("session")?.value;

  console.log(params);

  if (!session) {
    redirect(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/`);
  }

  const sessionData = session ? JSON.parse(session) : null;
  const isAdmin = sessionData && sessionData.dataUser.role === "ADMIN";

  if (!isAdmin) {
    redirect(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/`);
  }

}
