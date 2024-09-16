"use client";

import { IProduct } from "@/services/products/ProductsServices";
import { StockItem } from "./StockItem";

export default function StockItemsContainer({
  products,
}: {
  products: IProduct[];
}) {
  return (
    <div className="flex flex-col bg-foreground text-black">
      {products.map((product) => {
        return <StockItem product={product} key={product.id} />;
      })}
    </div>
  );
}
