import SelectBranch from "@/components/common/SelectBranch";
import BranchesServices from "@/services/branches/BranchesServices";
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

  let sessionData;
  try {
    sessionData = JSON.parse(session);
  } catch (error) {
    console.error("Error parsing session cookie:", error);
    redirect(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/`);
    return;
  }

  const userId = sessionData?.dataUser?.id;

  const [userData, branchesData] = await Promise.all([
    UsersServices.get(userId),
    BranchesServices.getAll(companyId),
  ]);

  const userBranch = userData.branch;
  const companyBranches = branchesData.branches;

  if (!userBranch) {
    return (
      <div className="flex absolute bg-background w-full h-screen overflow-hidden top-0 left-0 place-content-center items-center">
        <SelectBranch
          companyBranches={companyBranches}
          userBranch={userBranch}
          userId={userId}
        />
      </div>
    );
  }

  redirect(
    `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/${companyId}/sales`
  );
}
