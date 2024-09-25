"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useSales } from "@/context/salesContext";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./SalesContainer";

type AdditionalInformationProps = {
  form: UseFormReturn<FormValues>;
};

export default function AdditionalInformation({
  form,
}: AdditionalInformationProps) {
  const { discount, setDiscount } = useSales();

  const isdelivery = form.watch("isdelivery");

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setDiscount(value);
    }
  };

  return (
    <Form {...form}>
      <form>
        <Card>
          <CardHeader>
            <CardTitle>Información Adicional</CardTitle>
            <CardDescription>
              Ingresa información adicional para personalizar tu compra.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormItem className="">
              <FormLabel>Descuento (%)</FormLabel>
              <Input
                type="number"
                min="0"
                max="100"
                step="1"
                value={discount}
                onChange={handleDiscountChange}
                className="w-24"
              />
            </FormItem>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="isdelivery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>¿Con envío?</FormLabel>
                    <FormControl>
                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant={!field.value ? "accent" : "outline"}
                          className="w-10 h-10"
                          onClick={() => field.onChange(false)}
                        >
                          No
                        </Button>
                        <Button
                          type="button"
                          variant={field.value ? "accent" : "outline"}
                          className="w-10 h-10"
                          onClick={() => field.onChange(true)}
                        >
                          Sí
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deliveryAddress"
                disabled={!isdelivery}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Dirección de Entrega</FormLabel>
                    <FormControl>
                      <Input type="text" className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comentarios</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
