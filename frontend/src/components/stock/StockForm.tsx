import { useState, useRef } from "react";
import ProductsServices, {
  IProduct,
} from "@/services/products/ProductsServices";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { debounce } from "@/lib/debounce";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { capitalizeWords } from "@/lib/capitalizeWords";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

async function handleGetProduct({
  companyId,
  name,
}: {
  companyId: string;
  name: string;
}): Promise<IProduct[]> {
  try {
    const response = await ProductsServices.get({ companyId, name });
    return response.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

const formSchema = z.object({
  productId: z.string().min(1, { message: "Debe seleccionar un producto." }),
  branchId: z.string().min(1, { message: "Debe seleccionar una sucursal." }),
  quantity: z
    .number()
    .nonnegative({ message: "La cantidad debe ser mayor o igual a 0." }),
});

type StockFormProps = { companyId: string };

export default function StockForm({ companyId }: StockFormProps) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      branchId: "",
      quantity: 0,
    },
    mode: "onChange",
  });

  const debouncedSearch = useRef(
    debounce(async (value: string) => {
      if (value.trim().length <= 1) {
        setProducts([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      const response = await handleGetProduct({ companyId, name: value });
      setProducts(response);
      setIsLoading(false);
    }, 800)
  ).current;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value.toLowerCase());
    debouncedSearch.cancel();
    debouncedSearch(value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      debouncedSearch.cancel();
      if (searchTerm.trim().length <= 1) {
        setProducts([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      const response = await handleGetProduct({ companyId, name: searchTerm });
      setProducts(response);
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form>
        <Card>
          <CardHeader>
            <CardTitle>Gestión de stock</CardTitle>
            <CardDescription>
              Localiza productos o servicios por nombre y asígnales un stock
              inicial en tu sucursal.{" "}
              <span className="text-primary">
                Asegúrate de haber creado el producto antes de realizar esta
                acción.
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex border rounded-md bg-background flex-1 items-center gap-2 mt-1.5">
              <Input
                type="text"
                placeholder="Buscar por nombre de producto o servicio..."
                className="bg-transparent border-none text-primary"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <SearchIcon className="text-muted-foreground size-5 mr-4" />
            </div>
            <ScrollArea className="h-[200px]">
              <Table>
                {products.length > 0 && (
                  <TableCaption>Lista de productos</TableCaption>
                )}
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Cantidad</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading && (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center">
                        <p className="text-sm font-medium">Buscando...</p>
                      </TableCell>
                    </TableRow>
                  )}
                  {products.length === 0 && searchTerm.trim().length > 1 ? (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center">
                        <p className="text-sm font-medium">
                          No se encontraron productos que coincidan con "
                          {searchTerm}".
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center">
                        <p className="text-sm font-medium">
                          Aún no se han encontrado productos.
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{capitalizeWords(product.name)}</TableCell>
                        <TableCell>aca va la fn que crea el stock</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" className="flex" />
              <ScrollBar orientation="vertical" className="flex" />
            </ScrollArea>
          </CardContent>
        </Card>{" "}
      </form>
    </Form>
  );
}
