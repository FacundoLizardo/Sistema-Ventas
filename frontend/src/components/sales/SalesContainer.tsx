import { CardsContainer } from "@/components/sales/CardsContainer";
import SaleSeachBar from "@/components/sales/SaleSearchBar";
import { ProductInterface } from "@/services/products/ProductsServices";

export default function SalesContainer({
  products,
}: {
  products: ProductInterface[];
}) {
  return (
    //todo hacer un check para ver si el id del path es un id de una company
    <div className="flex flex-col gap-4">
      <SaleSeachBar />
      <CardsContainer products={products} />
    </div>
  );
}
