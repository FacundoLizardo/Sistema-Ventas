import NoAccess from "@/components/common/NoAccess";
import SalesContainer from "@/components/sales/SalesContainer";
import ProductsServices from "@/services/products/ProductsServices";
import { cookies } from "next/headers";

export default async function Page({
  params,
}: {
  params: {
    locale: string;
    companyId: string;
  };
}) {
  const { companyId } = params;
  const cookiesStore = cookies();
  const session = cookiesStore.get("session")?.value;
  const locale = params.locale;

  let products = [];

  if (session) {
    const response = await ProductsServices.getAll(companyId);
    products = response?.products || [];
  }

  return (
    <main>
      {session ? (
        <SalesContainer products={products} />
      ) : (
        <NoAccess locale={locale} />
      )}
    </main>
  );
}
