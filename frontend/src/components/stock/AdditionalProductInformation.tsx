"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FormControl, FormField, FormItem } from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "./ProductForm";
import { Switch } from "../ui/switch";

type AdditionalProductInformationProps = {
  form: UseFormReturn<ProductFormValues>;
};

export default function AdditionalProductInformation({
  form,
}: AdditionalProductInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información adicional</CardTitle>
        <CardDescription>
          Configure las opciones adicionales para el producto.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-between h-full py-8">
        <FormField
          control={form.control}
          name="allowNegativeStock"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4 justify-between">
              <div>
                <Label htmlFor="allowNegativeStock">
                  Permitir stock negativo
                </Label>
                <CardDescription className="text-xs">
                  Si está activado, permitirá que el stock del producto sea
                  negativo.
                </CardDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="trackStock"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4 justify-between">
              <div>
                <Label htmlFor="trackStock">Activar seguimiento de stock</Label>
                <CardDescription className="text-xs">
                  Si está activado, se llevará un seguimiento del stock
                  disponible.
                </CardDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="enabled"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4 justify-between">
              <div>
                <Label htmlFor="enabled">
                  Habilitar producto para la venta
                </Label>
                <CardDescription className="text-xs">
                  Si está activado, el producto estará disponible para su venta.
                </CardDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
