import ProductControl from "@/components/stock/ProductControl";
import ProductForm from "@/components/stock/ProductForm";
import CategoriesServices from "@/services/cetegories/CategoriesServices";
import ProductsServices from "@/services/products/ProductsServices";
import SubCategoriesServices from "@/services/subCetegories/SubCategoriesServices";
import UsersServices from "@/services/users/UsersServices";

const fetchData = async (companyId: string, branchId: string) => {
  try {
    const [productsData, categoriesData, subCategoriesData] = await Promise.all(
      [
        ProductsServices.getAll({ companyId, branchId }),
        CategoriesServices.get({ companyId }),
        SubCategoriesServices.get({ companyId }),
      ]
    );

    return {
      products: productsData.products,
      categories: categoriesData.categories.map(
        ({ name, id }: { name: string; id: string }) => ({ name, id })
      ),
      subCategories: subCategoriesData.subCategories.map(
        ({
          name,
          id,
          categoryId,
        }: {
          name: string;
          id: string;
          categoryId: string;
        }) => ({
          name,
          id,
          categoryId,
        })
      ),
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};

export default async function Page({
  params: { companyId },
}: {
  params: { companyId: string };
}) {
  const { userId, branchId } = await UsersServices.userSession();
  const { products, categories, subCategories } = await fetchData(
    companyId,
    branchId
  );

  return (
    <main className="grid gap-4">
      <ProductControl
        products={products}
        userId={userId}
        branchId={branchId}
        categories={categories}
      />
      <ProductForm
        categories={categories}
        subCategories={subCategories}
        branchId={branchId}
        companyId={companyId}
        userId={userId}
      />
    </main>
  );
}
