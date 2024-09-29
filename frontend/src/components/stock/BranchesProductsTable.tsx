"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  TableHeader,
  TableRow as UITableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { IProduct } from "@/services/products/ProductsServices";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

type BranchesProductsTableProps = {
  products: IProduct[];
  branchId: string;
};

const BranchesProductsTable = ({
  products,
  branchId,
}: BranchesProductsTableProps) => {
  return (
    <ScrollArea className="flex flex-col h-[350px]">
      <Table>
        <TableHeader>
          <UITableRow>
            <TableHead className="text-center">Producto</TableHead>
            <TableHead className="text-center">Estado</TableHead>
            <TableHead className="text-center">Precio</TableHead>
            <TableHead className="text-center">Cantidad</TableHead>
            <TableHead className="text-center">Categoría</TableHead>
            <TableHead className="text-center">Subcategoría</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </UITableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: IProduct, index: number) => {
            const branchStock = product.stock.find(
              (stock) => stock.branchId === branchId
            );

            return (
              <UITableRow key={index}>
                <TableCell className="px-2 py-0 text-center">
                  {product.name.replace(/^\w|(?<=\s)\w/g, (char) =>
                    char.toUpperCase()
                  )}
                </TableCell>
                <TableCell className="px-2 py-0 text-center">
                  <Badge variant="outline">
                    {product.enabled === true ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell className="px-2 py-0 text-center">
                  ${product?.finalPrice && product?.finalPrice.toFixed(2)}
                </TableCell>
                <TableCell className="px-2 py-0 text-center">
                  {branchStock ? branchStock.quantity : 0}
                </TableCell>
                <TableCell className="px-2 py-0 text-center">
                  {product.category?.name.replace(/^\w|(?<=\s)\w/g, (char) =>
                    char.toUpperCase()
                  )}
                </TableCell>
                <TableCell className="px-2 py-0 text-center">
                  {product.subCategory?.name.replace(/^\w|(?<=\s)\w/g, (char) =>
                    char.toUpperCase()
                  )}
                </TableCell>
                <TableCell className="px-2 py-0 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                        className="my-1"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Eliminar</DropdownMenuItem>
                      <DropdownMenuItem>Desactivar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
};

export default BranchesProductsTable;
