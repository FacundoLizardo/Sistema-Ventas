import { CardsContainer } from "@/components/sales/CardsContainer";
import SaleSeachBar from "@/components/sales/SaleSearchBar";
import { IProduct } from "@/services/products/ProductsServices";

import SelectedBranch from "../common/SelectedBranch";
import AfipForm from "./AfipForm";
import PaymentInformation from "./PaymentInformation";
import { ICompany } from "@/services/companies/CompaniesServices";
import AdditionalInformation from "./AdditionalInformation";

export default async function SalesContainer({
  products,
  userBranch,
  company,
  companyId,
  locale,
}: {
  products: IProduct[];
  userBranch: string;
  company: ICompany;
  companyId: string;
  locale: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <SelectedBranch branch={userBranch} />
      <SaleSeachBar products={products} />
      <CardsContainer />
      <AfipForm company={company} companyId={companyId} />
      <div className="grid md:grid-cols-2 gap-4">
        <AdditionalInformation />
        <PaymentInformation locale={locale} companyId={companyId} />
      </div>
    </div>
  );
}
