// /sales/confirmation/page.tsx
import InvoiceSummary from "@/components/sales/InvoiceSummary";
import { AfipContextProvider } from "@/context/afipContext";
import { SalesContextProvider } from "@/context/salesContext";
import CompaniesServices from "@/services/companies/CompaniesServices";
import UsersServices from "@/services/user/UsersServices";

export default async function ConfirmationPage({
  params: { companyId },
}: {
  params: {
    companyId: string;
  };
}) {
  const { userId, branchId } = await UsersServices.userSession();

  const [userData, companyData] = await Promise.all([
    UsersServices.get(userId),
    CompaniesServices.get(companyId),
  ]);

  const userBranchPtoVta = userData.user.branch.ptoVta;
  const userBranchName = userData.user.branch.name;
  const userBranch = userData?.user?.branch
    ? `${userBranchPtoVta} - ${userBranchName}`
    : "";
  const company = companyData.company;
  const userName = `${userData.user.firstName} ${userData.user.lastName}`;

  return (
    <main>
      <SalesContextProvider>
        <AfipContextProvider
          company={company}
          userBranchPtoVta={userBranchPtoVta}
          userId={userId}
          branchId={branchId}
          companyId={companyId}
        >
          <InvoiceSummary userBranch={userBranch} userName={userName} />
        </AfipContextProvider>
      </SalesContextProvider>
    </main>
  );
}
