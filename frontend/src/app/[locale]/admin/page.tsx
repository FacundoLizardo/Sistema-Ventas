import { AdminDashboard } from "@/components/admin/AdminDashboard";
import UsersServices from "@/services/user/UsersServices";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function AdminPage({
  params,
}: {
  params: { locale: string; companyId: string };
  children: React.ReactNode;
}) {
  const { role, companyId } = await UsersServices.userSession();

  if (role !== "ADMIN") {
    redirect(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/`);
  }
  

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <AdminDashboard locale={params.locale} companyId={companyId} />
      </Suspense>
    </main>
  );
}
