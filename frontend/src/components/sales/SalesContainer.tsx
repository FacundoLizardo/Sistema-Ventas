import { CardsContainer } from "@/components/sales/CardsContainer";
import SaleSeachBar from "@/components/sales/SaleSearchBar";
import { IProduct } from "@/services/products/ProductsServices";

import SelectedBranch from "../common/SelectedBranch";

export default async function SalesContainer({
  products,
  userBranch
}: {
  products: IProduct[];
  userBranch: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <SelectedBranch branch={userBranch} />
      <SaleSeachBar />
      <CardsContainer products={products} />
    </div>
  );
}
