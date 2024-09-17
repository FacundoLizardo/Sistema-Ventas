import SelectBranch from "@/components/common/SelectBranch";
import BranchesServices from "@/services/branches/BranchesServices";
import UsersServices from "@/services/user/UsersServices";
import { redirect } from "next/navigation";

export default async function Page({
  params: { locale, companyId },
}: {
  params: { locale: string; companyId: string };
}) {
  const { userId, isAdmin, branchId } = await UsersServices.userSession();

  const { branches } = await BranchesServices.getAll(companyId);

  if (isAdmin) {
    redirect(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/admin`);
  }

  if (!branchId) {
    redirect(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/admin`);
  }

  return (
    <main>
      <SelectBranch
        branches={branches}
        branchId={branchId}
        userId={userId}
        locale={locale}
        companyId={companyId}
      />
    </main>
  );
}
