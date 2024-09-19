import { CardsContainer } from "@/components/sales/CardsContainer";
import SaleSeachBar from "@/components/sales/SaleSearchBar";
import { IProduct } from "@/services/products/ProductsServices";

import SelectedBranch from "../common/SelectedBranch";
import AfipForm from "./AfipForm";
import SalesInfo from "./SalesInfo";
import { ICompany } from "@/services/companies/CompaniesServices";

export default async function SalesContainer({
  products,
  userBranch,
  company,
  companyId,
}: {
  products: IProduct[];
  userBranch: string;
  company: ICompany;
  companyId: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <SelectedBranch branch={userBranch} />
      <SaleSeachBar products={products} />
      <CardsContainer />
      <SalesInfo />
      <AfipForm company={company} companyId={companyId} />
    </div>
  );
}
