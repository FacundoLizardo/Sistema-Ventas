import SalesContainer from "@/components/sales/SalesContainer";
import ProductsServices from "@/services/products/ProductsServices";

export default async function RootPage() {
  const products = await ProductsServices.getProducts();

  return (
    //todo hacer un check para ver si el id del path es un id de una company
    <main>
      <SalesContainer />
    </main>
  );
}
