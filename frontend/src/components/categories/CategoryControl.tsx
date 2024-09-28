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
import CategoriesServices, {
  ICategory,
} from "@/services/cetegories/CategoriesServices";
import { Input } from "../ui/input";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { AlertDialogHeader, AlertDialogFooter } from "../ui/alert-dialog";

type CategoriesControlProps = {
  categories: ICategory[];
  companyId: string;
};

export default function CategoriesControl({
  companyId,
  categories,
}: CategoriesControlProps) {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Estado para el término de búsqueda
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      const request = CategoriesServices.delete({ companyId, id });

      toast.promise(request, {
        loading: "Eliminando la categoría...",
        success: () => {
          router.refresh();
          return "La categoría fue eliminada con éxito.";
        },
        error: "Error al eliminar la categoría.",
      });
    } catch (error) {
      toast.error("Error al eliminar la categoría.");
      console.error("Error al eliminar la categoría:", error);
    }
  };

  // Filtrar categorías basadas en el término de búsqueda
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex w-full border rounded-md bg-background flex-1 items-center gap-2 my-4">
        <Input
          type="text"
          placeholder="Buscar por nombre o categoría de producto o servicio..."
          className="bg-transparent border-none text-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon className="text-muted-foreground size-5 mr-4" />
      </div>

      <ScrollArea className="h-[400px] w-full">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableCaption>Lista de tus categorías</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Categoría</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category: ICategory) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.name}</TableCell>{" "}
                    <TableCell>
                      {category.description || "Sin descripción"}
                    </TableCell>{" "}
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            type="button"
                            className="hover:text-destructive"
                          >
                            <X size={16} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              ¿Estás seguro de que quieres eliminar esta
                              categoría?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no puede deshacerse. Esto elimina la
                              categoría y el producto queda sin una categoría.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(category.id)}
                            >
                              Confirmar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>No hay categorías.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>{" "}
        </div>
        <ScrollBar orientation="horizontal" className="flex" />
        <ScrollBar orientation="vertical" className="flex" />
      </ScrollArea>
    </div>
  );
}
