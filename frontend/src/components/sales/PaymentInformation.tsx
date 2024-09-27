"use client";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useSales } from "@/context/salesContext";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./SalesContainer";

type SalesInfoProps = {
  form: UseFormReturn<FormValues>;
  handleView: () => void;
};

export default function PaymentInformation({
  form,
  handleView,
}: SalesInfoProps) {
  const {
    productsSelected,
    discount,
    totalPrice,
    totalPriceWithDiscount,
    setDiscount,
    setProducts,
  } = useSales();

  const IVA = form.getValues("iva");
  const totalToPay = IVA
    ? totalPriceWithDiscount() * (1 + IVA / 100)
    : totalPriceWithDiscount();

  const { isDirty, isValid } = form.formState;
  const submitDisabled = !isDirty || !isValid;

  return (
    <div className="flex flex-col justify-between gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Información de Pago</CardTitle>
          <CardDescription>
            Aquí puedes ver los detalles del monto a pagar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="font-semibold">Cantidad de Productos</span>
              <span>{productsSelected.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Precio Total sin descuento</span>
              <span>$ {totalPrice()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Descuento</span>
              <span>% {discount}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Precio Total con descuento</span>
              <span>$ {totalPriceWithDiscount()}</span>
            </div>
            {IVA ? (
              <div className="flex justify-between">
                <span className="font-semibold">IVA (%)</span>
                <span>%{IVA || 0}</span>
              </div>
            ) : null}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full justify-between border-t pt-4 font-bold md:text-xl">
            <span className="text-secondary">Total a pagar</span>
            <Badge variant="secondary" className="md:text-lg">
              $ {totalToPay.toFixed(2)}
            </Badge>
          </div>
        </CardFooter>
      </Card>
      <CardFooter className="flex justify-center gap-4 bg-muted/50 px-3 py-2 md:px-6 md:py-4 rounded-md">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Resetear</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                ¿Estás seguro de que quieres resetear?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no puede deshacerse. Esto reseteará el formulario y
                limpiará todos los campos.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  form.reset();
                  setDiscount(0);
                  setProducts([]);
                }}
              >
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button
          variant="default"
          type="button"
          disabled={submitDisabled}
          onClick={() => {
            handleView();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Siguiente
        </Button>
      </CardFooter>
    </div>
  );
}
