import ProductControl from "@/components/stock/ProductControl";
import ProductForm from "@/components/stock/ProductForm";
import CategoriesServices from "@/services/cetegories/CategoriesServices";
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

  const [productsData, categoriesData] = await Promise.all([
    ProductsServices.getAll({ companyId, branchId }),
    CategoriesServices.get({ companyId }),
    CompaniesServices.get(companyId),
  ]);

  const products = productsData.products;
  const categories = categoriesData.categories.map(
    (category: { name: string; id: string }) => ({
      name: category.name,
      id: category.id,
    })
  );

  return (
    <main className="grid gap-4">
      <ProductControl
        products={products}
        userId={userId}
        companyId={companyId}
        branchId={branchId}
        categories={categories}
      />
      <ProductForm categories={categories} />
    </main>
  );
}
