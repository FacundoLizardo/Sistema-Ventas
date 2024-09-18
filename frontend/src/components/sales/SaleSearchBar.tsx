"use client";

import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { IProduct } from "@/services/products/ProductsServices";
import { Badge } from "../ui/badge";

export default function SaleSeachBar({ products }: { products: IProduct[] }) {
  const [open, setOpen] = useState(false);

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
                >
                  <p>{product.name}</p>
                  <p>
                    {product.stock > 0 ? (
                      <Badge variant="default">Disponible</Badge>
                    ) : (
                      <Badge variant="destructive">Agotado</Badge>
                    )}
                  </p>
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
