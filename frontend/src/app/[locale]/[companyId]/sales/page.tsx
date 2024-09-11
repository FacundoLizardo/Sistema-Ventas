import SalesContainer from "@/components/sales/SalesContainer";
import ProductsServices from "@/services/products/ProductsServices";
import { cookies } from "next/headers";

export default async function Page({
  params,
}: {
  params: {
    companyId: string;
  };
}) {
  const { companyId } = params;
  const cookiesStore = cookies();
  const session = cookiesStore.get("session")?.value;

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
        <p>No tienes acceso. Por favor, inicia sesión.</p>
      )}
    </main>
  );
}
