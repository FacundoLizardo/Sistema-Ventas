import StockControl from "@/components/stock/StockControl";
import { EditProductProvider } from "@/context/editProductContect";
import BranchesServices from "@/services/branches/BranchesServices";
import CategoriesServices from "@/services/cetegories/CategoriesServices";
import ProductsServices, {
  IProduct,
} from "@/services/products/ProductsServices";
import SubCategoriesServices from "@/services/subCetegories/SubCategoriesServices";
import UsersServices from "@/services/users/UsersServices";

export const dynamic = "force-dynamic";

const fetchData = async (companyId: string, branchId: string) => {
  try {
    const [productsData, categoriesData, subCategoriesData, branchesData] =
      await Promise.all([
        ProductsServices.get({ companyId }),
        CategoriesServices.get({ companyId }),
        SubCategoriesServices.get({ companyId }),
        BranchesServices.getAll(companyId),
      ]);

    return {
      products: productsData.products.filter((product: IProduct) =>
        product?.stock?.some((stockItem) => stockItem.branchId === branchId)
      ),
      allProducts: productsData.products,
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

export default async function Page({
  params: { companyId },
}: {
  params: { companyId: string };
}) {
  const { userId, branchId, isSuperAdmin, isOwner, isAdmin } =
    await UsersServices.userSession();
  const { products, allProducts, branchesData } = await fetchData(
    companyId,
    branchId
  );

  return (
    <EditProductProvider>
      <main className="grid gap-4">
        <StockControl
          products={products}
          allProducts={allProducts}
          userId={userId}
          branchId={branchId}
          branchesData={branchesData}
          companyId={companyId}
          isSuperAdmin={isSuperAdmin}
          isOwner={isOwner}
          isAdmin={isAdmin}
        />
      </main>
    </EditProductProvider>
  );
}
