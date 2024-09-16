import SelectBranch from "@/components/common/SelectBranch";
import BranchesServices from "@/services/branches/BranchesServices";
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
  
  const branchesData = await BranchesServices.getAll(companyId);
  
  const sessionData = JSON.parse(session);  
  const userId = sessionData?.dataUser?.id;
  const userBranch = sessionData?.dataUser?.branchId;
  const companyBranches = branchesData.branches;

  if (!userBranch) {
    return (
      <div className="flex w-full min-h-screen absolute left-0 z-50">
        <SelectBranch
          companyBranches={companyBranches}
          userBranch={userBranch}
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
