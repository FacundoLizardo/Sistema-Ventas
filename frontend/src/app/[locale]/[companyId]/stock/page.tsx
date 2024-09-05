import ProductForm from "@/components/stock/ProductForm";
import SearchProducts from "@/components/stock/SearchProducts";

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
    return (
      <main>
        {/* <SearchProducts/> */}
        <ProductForm locale={locale}/>
      </main>
    );
  }