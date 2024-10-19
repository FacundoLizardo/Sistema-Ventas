"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useSales } from "@/context/salesContext";
import { Button } from "../ui/button";
import { CiInboxIn } from "react-icons/ci";
import { capitalizeWords } from "@/lib/capitalizeWords";

export const CardsContainer = () => {
  const { productsSelected, addProduct, removeProduct } = useSales();

  const productCount: { [key: string]: number } = {};

  productsSelected.forEach((product) => {
    if (productCount[product.id]) {
      productCount[product.id] += 1;
    } else {
      productCount[product.id] = 1;
    }
  });

  const groupedProducts = Object.keys(productCount).map((id) => {
    const product = productsSelected.find((p) => p.id === id);
    return {
      ...product!,
      quantity: productCount[id],
    };
  });

  return (
    <div className="flex flex-col justify-items-center bg-background rounded-md h-[300px] border">
      {groupedProducts.length > 0 ? (
        <ScrollArea className="flex flex-col">
          <Table className="table">
            <TableCaption>Lista de productos seleccionados</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">Nombre</TableHead>
                <TableHead className="w-1/4 text-center">Precio</TableHead>
                <TableHead className="w-1/4 text-center">Cantidad</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groupedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="w-1/2">
                    {capitalizeWords(product.name)}
                  </TableCell>
                  <TableCell className="w-1/4 text-center">
                    $
                    {(
                      product.finalPrice &&
                      product.finalPrice * product.quantity
                    )?.toFixed(2)}
                  </TableCell>
                  <TableCell className="w-1/4 text-center">
                    <div className="flex justify-center gap-1 md:gap-4">
                      <Button
                        onClick={() => removeProduct(product.id)}
                        size={"sm"}
                        variant="outline"
                      >
                        -
                      </Button>
                      <div className="flex items-center justify-center w-4">
                        {product.quantity}
                      </div>
                      <Button
                        onClick={() => addProduct(product)}
                        size={"sm"}
                        variant="outline"
                      >
                        +
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar className="flex" />
        </ScrollArea>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <div>
            <CiInboxIn size={48} />
          </div>
          <p>No hay productos seleccionados</p>
        </div>
      )}
    </div>
  );
};
