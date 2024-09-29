import CategoriesContainer from "@/components/categories/CategoriesContainer";
import CategoriesServices from "@/services/cetegories/CategoriesServices";
import SubCategoriesServices from "@/services/subCetegories/SubCategoriesServices";

export default async function Page({
  params: { companyId },
}: {
  params: {
    locale: string;
    companyId: string;
  };
}) {
  const [categoriesData, subCategoriesData] = await Promise.all([
    CategoriesServices.get({ companyId }),
    SubCategoriesServices.get({ companyId }),
  ]);

  const categories = categoriesData.categories.map(
    (category: { name: string; id: string, description?: string }) => ({
      name: category.name,
      id: category.id,
      description: category.description,
    })
  );

  const subCategories = subCategoriesData.subCategories.map(
    (subCategory: { name: string; id: string, categoryId: string, description?: string }) => ({
      name: subCategory.name,
      id: subCategory.id,
      description: subCategory.description,
      categoryId: subCategory.categoryId,
    })
  );

  return (
    <main className="grid gap-4">
      <CategoriesContainer categories={categories} subCategories={subCategories} companyId={companyId} />
    </main>
  );
}
