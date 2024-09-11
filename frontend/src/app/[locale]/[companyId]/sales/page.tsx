import SalesContainer from "@/components/sales/SalesContainer";
import ProductsServices from "@/services/products/ProductsServices";

export default async function Page({
  params,
}: {
  params: {
    companyId: string;
  };
}) {
  const { companyId } = params;
  const { products } = await ProductsServices.getAll(companyId);

  return (
    <main>
      <SalesContainer products={products} />
    </main>
  );
}
