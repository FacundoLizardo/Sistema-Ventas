import { SearchIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { ICategory } from "@/services/cetegories/CategoriesServices";
import { Input } from "../ui/input";

type CategoriesControlProps = {
  categories: {
    name: string;
    id: string;
  }[];
};
export default function CategoriesControl({
  categories,
}: CategoriesControlProps) {
  return (
    <div>
      <div className="flex w-full border rounded-md bg-background flex-1 items-center gap-2 my-4">
        <Input
          type="text"
          placeholder="Buscar por nombre o cetegoría de producto o servicio..."
          className="bg-transparent border-none text-primary"
         /*  onChange={(e) => setSearchTerm(e.target.value)} */
        />
        <SearchIcon className="text-muted-foreground size-5 mr-4" />
      </div>
      <Table>
        <TableCaption>Lista de tus categorías</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Categoría</TableHead>
            <TableHead>Sub Categoría</TableHead>
            <TableHead className="hidden md:block">Descripción</TableHead>
            <TableHead>Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length > 0 ? (
            categories.map((category: ICategory) => (
              <TableRow key={category.id}>
                <TableCell className="">{category.name}</TableCell>
                <TableCell className="">{category.name}</TableCell>
                <TableCell className="hidden md:block">{category.name}</TableCell>
                <TableCell className="">
                  <Button variant={"ghost"} className="hover:text-destructive">
                    <X size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>No hay categorías.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
