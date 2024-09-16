import SelectBranch from "@/components/common/SelectBranch";
import BranchesServices from "@/services/branches/BranchesServices";
import UsersServices from "@/services/user/UsersServices";
import { redirect } from "next/navigation";

export default async function RootPage({
  params,
}: {
  params: { locale: string; companyId: string };
}) {
  const { companyId, locale } = params;
  const { userId, isAdmin, branchId } = await UsersServices.userSession();

  const { branches } = await BranchesServices.getAll(companyId);

  if (isAdmin) {
    redirect(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/admin`);
  }

  if (!branchId) {
    return (
      <div className="flex w-full min-h-screen absolute left-0 z-50">
        <SelectBranch
          branches={branches}
          branchId={branchId}
          userId={userId}
          params={params}
        />
      </div>
    );
  }

  redirect(
    `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/${companyId}/sales`
  );
}
