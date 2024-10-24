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
import ProductsServices, {
  IProduct,
} from "@/services/products/ProductsServices";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { capitalizeWords } from "@/lib/capitalizeWords";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import StockForm from "./StockForm";

type BranchProductsTableProps = {
  products: IProduct[];
  branchId: string;
  selectProduct: (product: IProduct) => void;
  companyId: string;
  isSuperAdmin: boolean;
  isOwner: boolean;
  isAdmin: boolean;
};

const BranchStockTable = ({
  products,
  branchId,
  selectProduct,
  companyId,
  isSuperAdmin,
  isOwner,
  isAdmin,
}: BranchProductsTableProps) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    console.log(id);
  };

  const canDeleteProduct = isSuperAdmin || isAdmin || isOwner;
  const canActivateProduct = isSuperAdmin || isAdmin || isOwner;
  const canEditProduct = isSuperAdmin || isAdmin || isOwner;

  return (
    <ScrollArea className="flex flex-col h-[600px]">
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
            const branchStock = product.stock?.find(
              (stock) => stock.branchId === branchId
            );

            return (
              <UITableRow key={index}>
                <TableCell className="px-2 py-0 text-center">
                  {product.name ? capitalizeWords(product.name) : ""}
                </TableCell>
                <TableCell className="px-2 py-0 text-center">
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
                <TableCell className="px-2 py-0 text-center">
                  {product?.finalPrice ? (
                    `$ ${product?.finalPrice}`
                  ) : (
                    <span className="text-xs text-primary">n/d</span>
                  )}
                </TableCell>
                <TableCell
                  className={
                    branchStock && branchStock.quantity < 0
                      ? "text-destructive px-2 py-0 text-center"
                      : "px-2 py-0 text-center"
                  }
                >
                  {branchStock
                    ? branchStock.quantity !== undefined
                      ? branchStock.quantity
                      : 0
                    : 0}
                </TableCell>
                <TableCell className="px-2 py-0 text-center">
                  {product.category?.name
                    ? capitalizeWords(product.category.name)
                    : ""}
                </TableCell>
                <TableCell className="px-2 py-0 text-center">
                  {product.subCategory?.name
                    ? capitalizeWords(product.subCategory.name)
                    : ""}
                </TableCell>
                <TableCell className="px-2 py-0 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="flex flex-col text-sm outline-none transition-colors items-start"
                    >
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      {canActivateProduct && (
                        <DropdownMenuItem
                          onClick={() => selectProduct(product)}
                        >
                          Editar
                        </DropdownMenuItem>
                      )}
                      {canDeleteProduct && (
                        <DropdownMenuItem asChild>
                          <AlertDialog>
                            <AlertDialogTrigger className="px-2 py-1.5 hover:bg-accent hover:text-accent-foreground rounded-md">
                              Eliminar
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  ¿Eliminar producto?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no puede deshacerse.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(product.id)}
                                >
                                  Confirmar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuItem>
                      )}
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

export default BranchStockTable;
