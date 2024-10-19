import CategoriesContainer from "@/components/categories/CategoriesContainer";
import CategoriesServices, { ICategory } from "@/services/cetegories/CategoriesServices";
import SubCategoriesServices, { ISubCategory } from "@/services/subCetegories/SubCategoriesServices";

export const dynamic = 'force-dynamic';

async function fetchCategories(companyId: string): Promise<ICategory[]> {
  try {
    const categoriesData = await CategoriesServices.get({ companyId });
    return categoriesData.categories.map(
      (category: { name: string; id: string; description?: string }) => ({
        name: category.name,
        id: category.id,
        description: category.description,
      })
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

async function fetchSubCategories(companyId: string): Promise<ISubCategory[]> {
  try {
    const subCategoriesData = await SubCategoriesServices.get({ companyId });
    return subCategoriesData.subCategories.map(
      (subCategory: { name: string; id: string; categoryId: string; description?: string }) => ({
        name: subCategory.name,
        id: subCategory.id,
        description: subCategory.description,
        categoryId: subCategory.categoryId,
      })
    );
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return [];
  }
}

export default async function Page({
  params: { companyId },
}: {
  params: {
    locale: string;
    companyId: string;
  };
}) {
  const [categories, subCategories] = await Promise.all([
    fetchCategories(companyId),
    fetchSubCategories(companyId),
  ]);

  return (
    <main className="grid gap-4">
      <CategoriesContainer categories={categories} subCategories={subCategories} companyId={companyId} />
    </main>
  );
}
