import ProductControl from "@/components/stock/ProductControl";
import ProductForm from "@/components/stock/ProductForm";
import CompaniesServices from "@/services/companies/CompaniesServices";
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
  const { userId, branchId } = await UsersServices.userSession();

  const [productsData] = await Promise.all([
    ProductsServices.getAll({ companyId, branchId }),
    CompaniesServices.get(companyId),
  ]);

  const products = productsData.products;

  return (
    <main className="grid gap-4">
      <ProductControl
        products={products}
        userId={userId}
        companyId={companyId}
        branchId={branchId}
      />
      <ProductForm />
    </main>
  );
}
