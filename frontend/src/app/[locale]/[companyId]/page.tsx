import UsersServices from "@/services/user/UsersServices";
import { redirect } from "next/navigation";

export default async function AppPage({
  params,
}: {
  params: { locale: string; companyId: string };
}) {
  const { companyId, locale } = params;
  const { isAdmin, branchId } = await UsersServices.userSession();

  if (isAdmin) {
    redirect(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/admin`);
  }

  if (!branchId) {
    redirect(
      `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/${companyId}/configuration/branch`
    );
  }

  redirect(
    `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/${companyId}/sales`
  );
}
