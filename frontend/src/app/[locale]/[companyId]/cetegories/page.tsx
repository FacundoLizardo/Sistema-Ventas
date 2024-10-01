import CategoriesContainer from "@/components/categories/CategoriesContainer";
import CategoriesServices from "@/services/cetegories/CategoriesServices";
import SubCategoriesServices from "@/services/subCetegories/SubCategoriesServices";

const fetchCategoriesData = async (companyId: string) => {
  const [categoriesData, subCategoriesData] = await Promise.all([
    CategoriesServices.get({ companyId }),
    SubCategoriesServices.get({ companyId }),
  ]);
  return { categoriesData, subCategoriesData };
};

export default async function Page({
  params: { companyId },
}: {
  params: { companyId: string };
}) {
  const { categoriesData, subCategoriesData } = await fetchCategoriesData(
    companyId
  );

  const categories = categoriesData.categories.map(
    ({
      name,
      id,
      description,
    }: {
      name: string;
      id: string;
      description: string;
    }) => ({
      name,
      id,
      description,
    })
  );

  const subCategories = subCategoriesData.subCategories.map(
    ({
      name,
      id,
      categoryId,
      description,
    }: {
      name: string;
      id: string;
      categoryId: string;
      description: string;
    }) => ({
      name,
      id,
      description,
      categoryId,
    })
  );

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
