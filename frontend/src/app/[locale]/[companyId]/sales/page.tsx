import SalesContainer from "@/components/sales/SalesContainer";
import ProductsServices from "@/services/products/ProductsServices";
import UsersServices from "@/services/user/UsersServices";

export default async function Page({
  params: { companyId },
}: {
  params: {
    locale: string;
    companyId: string;
  };
}) {
  const { userId } = await UsersServices.userSession();

  const [userData, productsData] = await Promise.all([
    UsersServices.get(userId),
    ProductsServices.getAll(companyId),
  ]);

  const userBranch = userData?.user?.branch
    ? `${userData.user.branch.ptoVta} - ${userData.user.branch.name}`
    : "";
  const products = productsData.products;

  return (
    <main className="w-full">
      <SalesContainer products={products} userBranch={userBranch} />
    </main>
  );
}
