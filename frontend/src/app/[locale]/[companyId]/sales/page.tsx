import SalesContainer from "@/components/sales/SalesContainer";
import { SalesContextProvider } from "@/context/salesContext";
import CompaniesServices from "@/services/companies/CompaniesServices";
import ProductsServices from "@/services/products/ProductsServices";
import UsersServices from "@/services/users/UsersServices";

export const dynamic = 'force-dynamic';

const fetchData = async (
  companyId: string,
  branchId: string,
  userId: string
) => {
  const [userData, productsData, companyData] = await Promise.all([
    UsersServices.get(userId),
    ProductsServices.get({ companyId, branchId }),
    CompaniesServices.get(companyId),
  ]);

  return { userData, productsData, companyData };
};

export default async function Page({
  params: { companyId },
}: {
  params: { companyId: string };
}) {
  const { userId, branchId } = await UsersServices.userSession();
  const { userData, productsData, companyData } = await fetchData(
    companyId,
    branchId,
    userId
  );

  const userBranch = userData.user?.branch
    ? `${userData.user.branch.ptoVta} - ${userData.user.branch.name}`
    : "";

  return (
    <main className="w-full">
      <SalesContextProvider>
        <SalesContainer
          products={productsData.products}
          userBranch={userBranch}
          company={companyData.company}
          companyId={companyId}
          userId={userId}
          branchId={branchId}
          userBranchPtoVta={userData.user?.branch?.ptoVta}
          userName={`${userData.user.firstName} ${userData.user.lastName}`}
        />
      </SalesContextProvider>
    </main>
  );
}
