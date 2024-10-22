"use client";

import { Label } from "@/components/ui/label";

import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "./ProductForm";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Alert, AlertDescription } from "../ui/alert";
import { OctagonAlert } from "lucide-react";
import { ICategory } from "@/services/cetegories/CategoriesServices";
import { useEffect, useState } from "react";
import { ISubCategory } from "@/services/subCetegories/SubCategoriesServices";

type BasicProductInformationProps = {
  form: UseFormReturn<ProductFormValues>;
  categories: ICategory[];
  subCategories: ISubCategory[];
};

export default function BasicProductInformation({
  form,
  categories,
  subCategories,
}: BasicProductInformationProps) {
  const [filteredSubCategories, setFilteredSubCategories] = useState<
    ISubCategory[]
  >([]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      const categoryId = value.categoryId;
      const filtered = subCategories.filter(
        (subCategory) => subCategory.categoryId === categoryId
      );
      setFilteredSubCategories(filtered);
    });

    return () => subscription.unsubscribe();
  }, [subCategories, form]);

  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="name">Nombre</Label>
            <FormControl>
              <Input
                id="name"
                placeholder="Nombre del producto o servicio"
                value={field.value ?? ""}
                onChange={(e) => {
                  const value =
                    e.target.value === ""
                      ? undefined
                      : e.target.value.toLowerCase();
                  field.onChange(value);
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="categoryId">Categoría</Label>
              <FormControl>
                <Select
                  value={field.value || ""}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories && categories.length > 0
                      ? categories.map((category, index) => (
                          <SelectItem key={index} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))
                      : null}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subCategoryId"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="subCategoryId">
                Subcategoría{" "}
                <span className="text-xs text-muted-foreground">
                  (opcional)
                </span>
              </Label>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!form.watch("categoryId")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una subcategoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredSubCategories && filteredSubCategories.length > 0
                      ? filteredSubCategories.map((subCategory, index) => (
                          <SelectItem key={index} value={subCategory.id}>
                            {subCategory.name}
                          </SelectItem>
                        ))
                      : null}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
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
            </FormItem>
          )}
        />

        {/*         <FormField
          control={form.control}
          name="stock.0.quantity"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="stock">Stock en sucursal</Label>
              <FormControl>
                <Input
                  id="stock"
                  type="number"
                  placeholder="Ingrese el stock"
                  value={field.value}
                  onChange={(e) => {
                    const value =
                      e.target.value === "" ? 0 : Number(e.target.value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        /> */}

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
          name="taxes"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="taxes">Impuestos (%)</Label>
              <FormControl>
                <Input
                  id="taxes"
                  type="number"
                  min={0}
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
          name="discount"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="discount">Descuento (%)</Label>
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
          name="profitPercentage"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="profitPercentage">Ganancia (%)</Label>
              <FormControl>
                <Input
                  id="profitPercentage"
                  type="number"
                  placeholder="Ingrese el % de ganancia"
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
              <Label htmlFor="finalPrice">Precio final</Label>
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
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Alert>
          <OctagonAlert size={16} />
          <AlertDescription>
            El precio final se calcula automáticamente, pero puedes ajustarlo
            manualmente.
          </AlertDescription>
        </Alert>

        <FormField
          control={form.control}
          name="notesDescription"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="notesDescription">
                Anotaciones / Descripción
              </Label>
              <FormControl>
                <Textarea
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
      </div>
    </div>
  );
}
