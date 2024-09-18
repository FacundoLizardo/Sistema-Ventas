"use client";

import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { AfipProducts, IProduct } from "@/services/products/ProductsServices";
import { Badge } from "../ui/badge";
import { useSales } from "@/context/salesContext";

type SaleSearchBarProps = {
  products: IProduct[];
};

export default function SaleSearchBar({ products }: SaleSearchBarProps) {
  const { addProduct } = useSales();
  const [open, setOpen] = useState(false);

  const handleProductClick = (product: AfipProducts) => {
    addProduct(product);
    setOpen(false);
  };

  return (
    <div
      className={`relative flex flex-col bg-card-foreground z-20 rounded-md text-black ${
        open ? "rounded-b-none" : ""
      }`}
    >
      <div className="flex flex-row items-center gap-2">
        <Input
          type="text"
          placeholder="Buscar producto..."
          className="bg-transparent border-none text-primary"
          onClick={() => setOpen(!open)}
        />
        <SearchIcon className="text-background size-5 mr-4" />
      </div>

      {open && (
        <div className="absolute top-10 h-fit w-full bg-card-foreground rounded-b-md p-2">
          <ScrollArea className="flex flex-col max-h-[250px]">
            <ul className="flex flex-col gap-1 cursor-pointer">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between hover:bg-muted-foreground p-2 gap-2 rounded"
                  onClick={() =>
                    handleProductClick({
                      id: product.id,
                      name: product.name,
                      finalPrice: product.finalPrice,
                    })
                  }
                >
                  <p>{product.name}</p>
                  <div>
                    {product.stock > 0 ? (
                      <Badge variant="default">Disponible</Badge>
                    ) : (
                      <Badge variant="destructive">Agotado</Badge>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <ScrollBar />
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
