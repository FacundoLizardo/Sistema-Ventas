import SelectBranch from "@/components/common/SelectBranch";
import BranchesServices from "@/services/branches/BranchesServices";
import UsersServices from "@/services/users/UsersServices";

export default async function Page({
  params: { locale, companyId },
}: {
  params: { locale: string; companyId: string };
}) {
  const { userId } = await UsersServices.userSession();

  const [branchesData, userData] = await Promise.all([
    BranchesServices.getAll(companyId),
    UsersServices.get(userId),
  ]);

  const branches = branchesData.branches;
  const user = userData.user;

  return (
    <main className="flex w-full min-h-screen absolute left-0 z-50">
      <SelectBranch
        branches={branches}
        locale={locale}
        companyId={companyId}
        userId={userId}
        user={user}
      />
    </main>
  );
}
