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
import SubCategoriesServices, {
  ISubCategory,
} from "@/services/subCetegories/SubCategoriesServices";

type CombinedCategory = {
  id: string;
  name: string;
  description?: string;
  type: "category" | "subcategory";
  categoryName?: string; // Propiedad opcional para subcategorías
};

type CategoriesControlProps = {
  categories: ICategory[];
  subCategories: ISubCategory[];
  companyId: string;
};

export default function CategoriesControl({
  companyId,
  categories,
  subCategories,
}: CategoriesControlProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  const handleDelete = async (id: string, type: "category" | "subcategory") => {
     try {
      let request;
      if (type === "category") {
        request = CategoriesServices.delete({ companyId, id });
      } else {
        request = SubCategoriesServices.delete({ companyId, id });
      }

      toast.promise(request, {
        loading: "Eliminando...",
        success: () => {
          router.refresh();
          return `La ${
            type === "category" ? "categoría" : "subcategoría"
          } fue eliminada con éxito.`;
        },
        error: (error) => {
          console.error("Error al eliminar:", error);
          return `Error al eliminar la ${
            type === "category" ? "categoría" : "subcategoría"
          }.`;
        },
      });
    } catch (error) {
      console.error("Error en el bloque catch:", error);
      toast.error(
        `Error al eliminar la ${
          type === "category" ? "categoría" : "subcategoría"
        }.`
      );
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSubCategories = subCategories.filter((subCategory) =>
    subCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const combinedData: CombinedCategory[] = [
    ...filteredCategories.map((category) => ({
      id: category.id,
      name: capitalizeFirstLetter(category.name),
      description: category.description,
      type: "category" as const,
    })),
    ...filteredSubCategories.map((subCategory) => ({
      id: subCategory.id,
      name: capitalizeFirstLetter(subCategory.name),
      description: subCategory.description,
      type: "subcategory" as const,
      categoryName:
        categories.find((category) => category.id === subCategory.categoryId)
          ?.name || "Sin categoría",
    })),
  ];
  
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
            <TableCaption>Lista de tus categorías y subcategorías</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {combinedData.length > 0 ? (
                combinedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.type === "category" ? "Categoría" : "Subcategoría"}
                    </TableCell>
                    <TableCell>
                      {item.type === "subcategory" ? (
                        <>
                          {item.name}{" "}
                          <span className="text-muted-foreground text-xs">
                            ({item.categoryName})
                          </span>
                        </>
                      ) : (
                        item.name
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {item.description || "Sin descripción"}
                    </TableCell>
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
                              {`¿Estás seguro de que quieres eliminar esta ${item.type === "category" ? "Categoría" : "Subcategoría"}?`}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no puede deshacerse. Esto eliminará la{" "}
                              {item.type === "category" ? "Categoría" : "Subcategoría"}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(item.id, item.type)}
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
                  <TableCell colSpan={4}>
                    No hay categorías ni subcategorías.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" className="flex" />
        <ScrollBar orientation="vertical" className="flex" />
      </ScrollArea>
    </div>
  );
}
