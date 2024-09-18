import { IProduct } from "@/services/products/ProductsServices";
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

export const CardsContainer = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="flex flex-col justify-items-center bg-background rounded-md py-2">
      {products.length > 0 ? (
        <ScrollArea className="flex flex-col h-[300px]">
          <Table>
            <TableCaption>Lista de productos seleccionados</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.finalPrice}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar className="flex" />
        </ScrollArea>
      ) : (
        <p>No hay productos seleccionados</p>
      )}
    </div>
  );
};
