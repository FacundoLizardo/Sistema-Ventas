"use client";

import { products } from "@/mockData";
import StockPagination from "./StockPagination";
import StockSearchBar from "./StockSearchBar";
import StockItems from "./StockItems";

export default function SearchProducts() {
  const tags = Array.from({ length: 12 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );
  return (
    <div className={`flex flex-col gap-2`}>
        <StockSearchBar/>
        <StockItems data={products}/>
        <StockPagination/>
    </div>
  );
}
