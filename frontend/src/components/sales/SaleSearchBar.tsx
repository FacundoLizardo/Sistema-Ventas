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
  const [searchTerm, setSearchTerm] = useState("");

  const handleProductClick = (product: AfipProducts) => {
    addProduct(product);
    setOpen(false);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`relative flex flex-col bg-card-foreground z-20 rounded-md text-black ${
        open ? "rounded-b-none" : ""
      }`}
    >
      <div className="flex flex-row items-center gap-2">
        <Input
          type="text"
          placeholder="Buscar producto o servicio..."
          className="bg-transparent border-none text-primary"
          onClick={() => setOpen(!open)}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon className="text-background size-5 mr-4" />
      </div>

      {open && (
        <div className="absolute top-10 h-fit w-full bg-card-foreground rounded-b-md p-2">
          <ScrollArea className="flex flex-col max-h-[250px]">
            <ul className="flex flex-col gap-1 cursor-pointer">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
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
                    <p>
                      {product.name.replace(/\b\w/g, (char) =>
                        char.toUpperCase()
                      )}
                    </p>

                    <div>
                      {Array.isArray(product.stock) &&
                      product.stock.length > 0 ? (
                        <div className="flex flex-col">
                          {product.stock.map((stockItem, index) => (
                            <Badge key={index} variant="default">
                              {stockItem.quantity}{" "}
                              {stockItem.quantity !== 1
                                ? "disponibles"
                                : "disponible"}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <Badge variant="destructive">Agotado</Badge>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-center text-muted-foreground">
                  No se encontraron productos
                </li>
              )}
            </ul>

            <ScrollBar />
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
