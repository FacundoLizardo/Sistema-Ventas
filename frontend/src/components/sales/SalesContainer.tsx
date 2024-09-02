import { CardsContainer } from "@/components/sales/CardsContainer";
import SaleSeachBar from "@/components/sales/SaleSearchBar";
import { products } from "@/mockData";

export default function SalesContainer() {
  return (
    //todo hacer un check para ver si el id del path es un id de una company
    <div className="flex flex-col gap-4">
      <SaleSeachBar />
      <CardsContainer data={products} />
    </div>
  );
}
