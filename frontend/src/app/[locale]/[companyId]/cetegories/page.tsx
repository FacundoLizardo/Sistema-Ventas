import CategoriesContainer from "@/components/categories/CategoriesContainer";
import CategoriesServices from "@/services/cetegories/CategoriesServices";

export default async function Page({
  params: { companyId },
}: {
  params: {
    locale: string;
    companyId: string;
  };
}) {
  const [categoriesData] = await Promise.all([
    CategoriesServices.get({ companyId }),
  ]);

  const categories = categoriesData.categories.map(
    (category: { name: string; id: string }) => ({
      name: category.name,
      id: category.id,
    })
  );

  return (
    <main className="grid gap-4">
      <CategoriesContainer categories={categories} companyId={companyId} />
    </main>
  );
}
