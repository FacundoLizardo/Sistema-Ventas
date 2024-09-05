'use client'

import { ProductInterface } from "@/types"
import { StockItem } from "./StockItem"

interface StockItemsProps {
    data: ProductInterface[]
}
export default function StockItemsContainer ({data}: StockItemsProps) {
    return (
        <div className="flex flex-col bg-foreground text-black">
          {data.map((product)=>{
            return <StockItem product={product} key={product.id}/>
          })}
        </div>
    )
}
