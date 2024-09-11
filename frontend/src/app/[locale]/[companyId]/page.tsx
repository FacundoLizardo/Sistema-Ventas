import UsersServices from "@/services/user/UsersServices";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootPage({
  params,
}: {
  params: { locale: string; companyId: string };
}) {
  const { companyId, locale } = params;
  const cookiesStore = cookies();
  const session = cookiesStore.get("session")?.value;

  if (!session) {
    redirect(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/`);
  }

  const userData = await UsersServices.get(companyId);
  const userBranches = userData.branches;

  if (!userBranches) {
    return (
      <div className="flex absolute bg-background w-full h-screen overflow-hidden top-0 left-0 place-content-center items-center">
        <h1>Componente para seleccionar sucursales</h1>
      </div>
    );
  }

  redirect(
    `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/${companyId}/sales`
  );
}
