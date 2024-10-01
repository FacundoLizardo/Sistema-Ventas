import CategoriesContainer from "@/components/categories/CategoriesContainer";
import CategoriesServices from "@/services/cetegories/CategoriesServices";
import SubCategoriesServices from "@/services/subCetegories/SubCategoriesServices";

const fetchCategoriesData = async ({ companyId }: { companyId: string }) => {
  try {
    const [categoriesResponse, subCategoriesResponse] = await Promise.all([
      CategoriesServices.get({ companyId }),
      SubCategoriesServices.get({ companyId }),
    ]);

    return {
      categories: categoriesResponse.categories.map(
        (category: { name: string; id: string; description?: string }) => ({
          name: category.name,
          id: category.id,
          description: category.description,
        })
      ),
      subCategories: subCategoriesResponse.subCategories.map(
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
      ),
    };
  } catch (error) {
    console.error("Error fetching categories or subcategories:", error);
    return {
      categories: [],
      subCategories: [],
    };
  }
};

export default async function Page({
  params: { companyId },
}: {
  params: {
    locale: string;
    companyId: string;
  };
}) {
  // Función para manejar las solicitudes y optimizar errores

  const { categories, subCategories } = await fetchCategoriesData({
    companyId,
  });

  return (
    <main className="grid gap-4">
      <CategoriesContainer
        categories={categories}
        subCategories={subCategories}
        companyId={companyId}
      />
    </main>
  );
}
