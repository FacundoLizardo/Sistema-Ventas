import UsersServices from "@/services/users/UsersServices";
import { redirect } from "next/navigation";

export default async function AppPage({
  params,
}: {
  params: { locale: string; companyId: string };
}) {
  const { companyId, locale } = params;
  const { branchId } = await UsersServices.userSession();

  if (!branchId) {
    redirect(
      `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/${companyId}/configuration/branch`
    );
  }

  redirect(
    `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/${companyId}/sales`
  );
}
