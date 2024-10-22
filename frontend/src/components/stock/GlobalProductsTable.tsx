"use client";

import {
  TableHeader,
  TableRow as UITableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { capitalizeWords } from "@/lib/capitalizeWords";
import { IProductFull } from "@/services/products/ProductsServices";

type BranchesProductsTableProps = {
  allProducts: IProductFull[];
};

export default function GlobalProductsTable({
  allProducts,
}: BranchesProductsTableProps) {
  return (
    <ScrollArea className="flex flex-col h-[350px]">
      <Table>
        <TableHeader>
          <UITableRow>
            <TableHead className="text-center">Producto</TableHead>
            <TableHead className="text-center">Estado</TableHead>
            <TableHead className="text-center">Cantidad total</TableHead>
          </UITableRow>
        </TableHeader>
        <TableBody>
          {allProducts.map((product, index) => {
            return (
              <UITableRow key={index}>
                <TableCell className="p-2 text-center">
                  {product.name ? capitalizeWords(product.name) : ""}
                </TableCell>
                <TableCell className="p-2 text-center">
                  <Badge
                    variant="outline"
                    className={
                      product.enabled
                        ? "text-constructive border-constructive"
                        : "text-destructive border-destructive"
                    }
                  >
                    {product.enabled ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell className="p-2 text-center">
                  {product?.stock?.reduce((acc, stock) => {
                    return acc + stock.quantity;
                  }, 0) || 0}
                </TableCell>
              </UITableRow>
            );
          })}
        </TableBody>
        <ScrollBar orientation="horizontal" className="flex" />
        <ScrollBar orientation="vertical" className="flex" />
      </Table>
    </ScrollArea>
  );
}
