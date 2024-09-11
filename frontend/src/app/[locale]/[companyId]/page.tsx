import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const cookiesStore = cookies();
  const session = cookiesStore.get("session")?.value;

  if (!session) {
    redirect(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/`);
  }

  return (
    <div>
      <p>Cargando..</p>
    </div>
  )
}
