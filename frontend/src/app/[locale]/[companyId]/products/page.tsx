import ProductControl from "@/components/products/ProductControl";
import ProductForm from "@/components/products/ProductForm";
import { EditProductProvider } from "@/context/editProductContect";
import BranchesServices from "@/services/branches/BranchesServices";
import CategoriesServices from "@/services/cetegories/CategoriesServices";
import ProductsServices from "@/services/products/ProductsServices";
import SubCategoriesServices from "@/services/subCetegories/SubCategoriesServices";
import UsersServices from "@/services/users/UsersServices";

export const dynamic = "force-dynamic";

const fetchData = async (companyId: string) => {
  try {
    const [productsData, categoriesData, subCategoriesData, branchesData] =
      await Promise.all([
        ProductsServices.get({ companyId }),
        CategoriesServices.get({ companyId }),
        SubCategoriesServices.get({ companyId }),
        BranchesServices.getAll(companyId),
      ]);

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
      branchesData: branchesData.branches,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default async function ProductsPage({
  params: { companyId },
}: {
  params: { companyId: string };
}) {
  const { userId, branchId, isSuperAdmin, isOwner, isAdmin } =
    await UsersServices.userSession();
  const { products, categories, subCategories, branchesData } = await fetchData(
    companyId
  );

  return (
    <EditProductProvider>
      <main className="grid gap-4">
        <ProductControl
          products={products}
          userId={userId}
          branchId={branchId}
          branchesData={branchesData}
          categories={categories}
          companyId={companyId}
          isSuperAdmin={isSuperAdmin}
          isOwner={isOwner}
          isAdmin={isAdmin}
        />
        <ProductForm
          categories={categories}
          subCategories={subCategories}
          branchId={branchId}
          companyId={companyId}
          userId={userId}
        />
      </main>
    </EditProductProvider>
  );
}
