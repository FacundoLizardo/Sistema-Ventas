"use client";

import StockPagination from "./StockPagination";
import StockSearchBar from "./StockSearchBar";
//import StockItemsContainer from "./StockItemsContainer";


export default function SearchProducts() {

  return (
    <div className={`flex flex-col gap-2`}>
        <StockSearchBar/>
        <StockPagination/>
    </div>
  );
}
