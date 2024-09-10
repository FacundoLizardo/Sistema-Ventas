import SalesContainer from "@/components/sales/SalesContainer";
import ProductsServices from '@/services/products/ProductsServices';

export default async function RootPage() {
   const products = await ProductsServices.getAll()
  console.log(products) 
  return (
    //todo hacer un check para ver si el id del path es un id de una company
    <main>
      <SalesContainer />
    </main>
  );
}
