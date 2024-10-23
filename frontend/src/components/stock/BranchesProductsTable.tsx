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
import { IBranch } from "@/services/branches/BranchesServices";
import { IProductFull } from "@/services/products/ProductsServices";

const getBranchNameById = (
  branchId: string,
  branchesData: IBranch[]
): string => {
  const branch = branchesData.find((branch) => branch.id === branchId);
  return branch ? branch.name : "Sucursal no encontrada";
};

type BranchesProductsTableProps = {
  allProducts: IProductFull[];
  branchesData: IBranch[];
};

export default function BranchesProductsTable({
  allProducts,
  branchesData,
}: BranchesProductsTableProps) {
  console.log("branchesData", branchesData);
  
  return (
    <ScrollArea className="flex flex-col h-[600px]">
      <Table>
        <TableHeader>
          <UITableRow>
            <TableHead className="text-center">Producto</TableHead>
            <TableHead className="text-center">Estado</TableHead>
            <TableHead className="text-center">Sucursal</TableHead>
            <TableHead className="text-center">Cantidad</TableHead>
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
                  
                </TableCell>
                <TableCell className="p-2 text-center">
                  {product?.stock?.map((stock) => stock.quantity)}
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
