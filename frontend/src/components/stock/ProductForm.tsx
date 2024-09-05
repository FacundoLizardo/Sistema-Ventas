"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postProductService } from "@/services/products/postProductsService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ButtonWithLoading from "../common/ButtonWithLoading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

const formSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido." }),
  category: z.string().optional(),
  cost: z
    .number()
    .nonnegative({ message: "El costo no puede ser negativo." })
    .optional(),
  finalPrice: z
    .number()
    .nonnegative({ message: "El costo no puede ser negativo." })
    .optional(),
  discount: z.number().optional(),
  profitPercentage: z
    .number()
    .gte(0, {
      message: "El porcentaje de ganancia debe ser mayor o igual a 0.",
    })
    .lte(100, {
      message: "El porcentaje de ganancia debe ser menor o igual a 100.",
    })
    .optional(),
  stock: z.number().optional(),
  allowNegativeStock: z.boolean(),
  trackStock: z.boolean(),
  minimumStock: z.number().optional(),
  enabled: z.boolean(),
  notesDescription: z
    .string()
    .max(255, {
      message: "La descripción no debe superar los 255 caracteres.",
    })
    .optional(),
  taxes: z
    .number()
    .gte(0, { message: "Las tasas no pueden ser negativas." })
    .optional(),
  barcode: z.string(),
});

export default function ProductForm({ locale }: { locale: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      category: undefined,
      cost: undefined,
      finalPrice: undefined,
      discount: undefined,
      profitPercentage: undefined,
      stock: undefined,
      allowNegativeStock: false,
      trackStock: false,
      minimumStock: undefined,
      enabled: false,
      notesDescription: undefined,
      taxes: undefined,
      barcode: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const request = postProductService(data);

    toast.promise(request, {
      loading: "Creando el producto...",
      success: () => {
        form.reset();
        return "El producto fue creado con exito.";
      },
      error: "Error al crear el producto.",
    });
  };

  const { isDirty, isValid, isSubmitting } = form.formState;
  const submitDisabled = !isDirty || !isValid;
  const submitLoading = isSubmitting;

  return (
    <Card>
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Crear un nuevo producto</CardTitle>
            <CardDescription>
              Complete el formulario para crear un nuevo producto.
            </CardDescription>
          </CardHeader>
          <CardContent className="md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name">Nombre</Label>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Ingrese el nombre del producto"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value =
                          e.target.value === "" ? undefined : e.target.value;
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="category">Categoria</Label>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      {...field}
                    >
                      {}
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bebidas sin alcohol">
                          Bebidas sin alcohol
                        </SelectItem>
                        <SelectItem value="Bebidas alcoholicas">
                          Bebidas alcoholicas
                        </SelectItem>
                        <SelectItem value="Kiosco">Kiosco</SelectItem>
                        <SelectItem value="Cigarrillos">Cigarrillos</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* TODO crear form para categorias */}

            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="cost">Costo</Label>
                  <FormControl>
                    <Input
                      id="cost"
                      type="number"
                      placeholder="Ingrese el costo"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value =
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="discount">Descuento</Label>
                  <FormControl>
                    <Input
                      id="discount"
                      type="number"
                      placeholder="Ingrese el descuento"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value =
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="finalPrice"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="finalPrice">Percio final</Label>
                  <FormControl>
                    <Input
                      id="finalPrice"
                      type="number"
                      placeholder="Ingrese el percio final"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value =
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Hasta ok */}

            <FormField
              control={form.control}
              name="profitPercentage"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="profitPercentage">
                    Porcentaje de ganancia
                  </Label>
                  <FormControl>
                    <Input
                      id="profitPercentage"
                      type="number"
                      placeholder="Ingrese el porcentaje de ganancia"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value =
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="stock">Stock</Label>
                  <FormControl>
                    <Input
                      id="stock"
                      type="number"
                      placeholder="Ingrese el stock"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value =
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minimumStock"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="minimumStock">Stock minimo</Label>
                  <FormControl>
                    <Input
                      id="minimumStock"
                      type="number"
                      placeholder="Ingrese el stock minimo"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value =
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="allowNegativeStock"
              render={({ field }) => (
                <FormItem className="flex gap-2 items-center">
                  <FormControl>
                    <Checkbox
                      id="allowNegativeStock"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-2"
                    />
                  </FormControl>
                  <Label htmlFor="allowNegativeStock">
                    Permitir stock negativo
                  </Label>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="trackStock"
              render={({ field }) => (
                <FormItem className="flex gap-2 items-center">
                  <FormControl>
                    <Checkbox
                      id="trackStock"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-2"
                    />
                  </FormControl>
                  <Label htmlFor="trackStock">Seguimiento de stock</Label>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="enabled"
              render={({ field }) => (
                <FormItem  className="flex gap-2 items-center">
                  <FormControl>
                    <Checkbox
                      id="enabled"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                       className="mt-2"
                    />
                  </FormControl>
                  <Label htmlFor="enabled">Habilitado para la venta</Label>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notesDescription"
              render={({ field }) => (
                <FormItem className="col-span-2 w-full">
                  <Label htmlFor="notesDescription">
                    Anotaciones / descripcion
                  </Label>
                  <FormControl>
                    <Input
                      id="notesDescription"
                      placeholder="Escriba las anotaciones necesarias"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value =
                          e.target.value === "" ? undefined : e.target.value;
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="taxes"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="taxes">Impuestos</Label>
                  <FormControl>
                    <Input
                      id="taxes"
                      type="number"
                      placeholder="Ingrese el porcentaje de impuestos"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value =
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="barcode"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="barcode">Codigo de barras</Label>
                  <FormControl>
                    <Input
                      id="barcode"
                      placeholder="Ingrese el codigo de barras"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value =
                          e.target.value === "" ? undefined : e.target.value;
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <ButtonWithLoading
              loading={submitLoading}
              loadingText="Creando producto..."
              variant="default"
              className="flex flex-row items-center"
              type="submit"
              disabled={submitDisabled}
            >
              Crear producto
            </ButtonWithLoading>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
