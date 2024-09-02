import { CardsContainer } from "@/components/sales/CardsContainer";
import SalesContainer from "@/components/sales/SalesContainer";
import SaleSeachBar from "@/components/sales/SaleSearchBar";
import { products } from "@/mockData";

export default function RootPage() {
  return (
    //todo hacer un check para ver si el id del path es un id de una company
    <main>
      <SalesContainer />
    </main>
  );
}
