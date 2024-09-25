import SalesContainer from "@/components/sales/SalesContainer";
import { AfipContextProvider } from "@/context/afipContext";
import { SalesContextProvider } from "@/context/salesContext";
import CompaniesServices from "@/services/companies/CompaniesServices";
import ProductsServices from "@/services/products/ProductsServices";
import UsersServices from "@/services/user/UsersServices";

export default async function Page({
  params: { locale, companyId },
}: {
  params: {
    locale: string;
    companyId: string;
  };
}) {
  const { userId, branchId } = await UsersServices.userSession();

  const [userData, productsData, companyData] = await Promise.all([
    UsersServices.get(userId),
    ProductsServices.getAll({ companyId, branchId }),
    CompaniesServices.get(companyId),
  ]);

  const userBranchPtoVta = userData.user.branch.ptoVta;
  
  const userBranchName = userData.user.branch.name;
  const userBranch = userData?.user?.branch
    ? `${userBranchPtoVta} - ${userBranchName}`
    : "";
  const products = productsData.products;
  const company = companyData.company;

  return (
    <main className="w-full">
      <SalesContextProvider>
        <AfipContextProvider
          company={company}
          userBranchPtoVta={userBranchPtoVta}
          userId={userId}
          branchId={branchId}
          companyId={companyId}
        >
          <SalesContainer
            products={products}
            userBranch={userBranch}
            company={company}
            companyId={companyId}
            locale={locale}
          />
        </AfipContextProvider>
      </SalesContextProvider>
    </main>
  );
}
