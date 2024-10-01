import CategoriesContainer from "@/components/categories/CategoriesContainer";
import CategoriesServices from "@/services/cetegories/CategoriesServices";
import SubCategoriesServices from "@/services/subCetegories/SubCategoriesServices";
import { Suspense } from "react";

interface Category {
  name: string;
  id: string;
  description?: string;
}

interface SubCategory {
  name: string;
  id: string;
  categoryId: string;
  description?: string;
}

async function fetchCategories(companyId: string): Promise<Category[]> {
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

async function fetchSubCategories(companyId: string): Promise<SubCategory[]> {
  try {
    const subCategoriesData = await SubCategoriesServices.get({ companyId });
    // acá no puedo poner un promise
    return subCategoriesData.subCategories.map(
      (subCategory: {
        name: string;
        id: string;
        categoryId: string;
        description?: string;
      }) => ({
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
      <Suspense fallback={<div>Cargando...</div>}>
        <CategoriesContainer
          categories={categories}
          subCategories={subCategories}
          companyId={companyId}
        />
      </Suspense>
    </main>
  );
}
