"use client";

import { ProductInterface } from "@/services/products/ProductsServices";
import { StockItem } from "./StockItem";

export default function StockItemsContainer({
  products,
}: {
  products: ProductInterface[];
}) {
  return (
    <div className="flex flex-col bg-foreground text-black">
      {products.map((product) => {
        return <StockItem product={product} key={product.id} />;
      })}
    </div>
  );
}
