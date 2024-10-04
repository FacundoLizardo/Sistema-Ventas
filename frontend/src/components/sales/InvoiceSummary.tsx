"use client";

import React from "react";
import ButtonWithLoading from "../common/ButtonWithLoading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useSales } from "@/context/salesContext";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { Form } from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./SalesContainer";
import { IAfip } from "@/services/afip/AfipServices";

type InvoiceSummaryProps = {
  userBranch: string;
  userName?: string;
  form: UseFormReturn<FormValues>;
  onSubmit: (data: IAfip) => void;
  handleView: () => void;
};

export default function InvoiceSummary({
  userBranch,
  userName,
  form,
  onSubmit,
  handleView,
}: InvoiceSummaryProps) {
  const { totalPrice, totalPriceWithDiscount, discount } = useSales();

  const operationData = form.getValues();

  const productCount: { [key: string]: number } = {};

  const products = operationData.products || [];
  products?.forEach((product) => {
    if (productCount[product.id]) {
      productCount[product.id] += 1;
    } else {
      productCount[product.id] = 1;
    }
  });

  const groupedProducts = Object.keys(productCount).map((id) => {
    const product = operationData.products.find((p) => p.id === id);
    return {
      ...product!,
      quantity: productCount[id],
    };
  });

  const docTipo = operationData.docTipo;
  const docNro = operationData.docNro;
  const cbteTipo = operationData.cbteTipo;
  const concepto = operationData.concepto;
  const paymentType = operationData.paymentType;
  const comments = operationData.comments;
  const isdelivery = operationData.isdelivery;
  const IVA = form.getValues("iva");
  const totalToPay = IVA
    ? totalPriceWithDiscount() * (1 + IVA / 100)
    : totalPriceWithDiscount();

  const { isValid, isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid place-content-center lg:grid-cols-2 w-full gap-4 my-4 items">
          <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
            <CardHeader className="flex flex-row items-start bg-muted/50 px-3 py-2 md:px-6 md:py-3 rounded-md">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-0.5 text-lg">
                  Revisión de Productos
                </CardTitle>
                <CardDescription>
                  {format(new Date(), "EEEE dd 'de' MMMM 'de' yyyy", {
                    locale: es,
                  })}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="grid gap-0.5">
                <div className="font-semibold">Productos seleccionados</div>
                <div>
                  {groupedProducts.length > 0 ? (
                    <Table className="table text-xs md:text-sm">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-1/2">Nombre</TableHead>
                          <TableHead className="w-1/4 text-center">
                            Precio
                          </TableHead>
                          <TableHead className="w-1/4 text-center">
                            Cantidad
                          </TableHead>
                          <TableHead className="w-1/4 text-center">
                            Total
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {groupedProducts.map((product, index: number) => (
                          <TableRow key={`${product.id}-${index}`}>
                            <TableCell className="w-1/2 text-muted-foreground">
                              {product.name}
                            </TableCell>
                            <TableCell className="w-1/4 text-center">
                              {product.finalPrice.toFixed(2)}
                            </TableCell>
                            <TableCell className="w-1/4 text-center">
                              {product.quantity}
                            </TableCell>
                            <TableCell className="flex w-1/4 text-center">
                              {(product.quantity * product.finalPrice).toFixed(
                                2
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-muted-foreground">
                      No seleccionaste ningún producto.
                    </div>
                  )}
                </div>
                <Separator className="my-2" />

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between">
                    <span className="font-semibold">Cantidad de Productos</span>
                    <span>{groupedProducts.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">
                      Precio Total sin descuento
                    </span>
                    <span>$ {totalPrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Descuento</span>
                    <span>% {discount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">
                      Precio Total con descuento
                    </span>
                    <span>$ {totalPriceWithDiscount()}</span>
                  </div>
                  {IVA ? (
                    <div className="flex justify-between">
                      <span className="font-semibold">IVA (%)</span>
                      <span>%{IVA || 0}</span>
                    </div>
                  ): null}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-row bg-muted/50 px-3 py-2 md:px-6 md:py-3 rounded-md">
              <div className="flex w-full justify-between py-4 font-bold md:text-xl">
                <span className="flex text-primary items-center">
                  Total a pagar
                </span>
                <Badge variant="default" className="md:text-lg">
                  $ {totalToPay.toFixed(2)}
                </Badge>
              </div>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
            <CardHeader className="flex flex-row items-start bg-muted/50 px-3 py-2 md:px-6 md:py-3 rounded-md">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-0.5 text-lg">
                  Revisión de datos de emisión
                </CardTitle>
                <CardDescription>
                  Asegúrate de que los datos ingresados sean correctos antes de
                  proceder con la emisión.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="grid gap-0.5">
                <div className="font-semibold">Detalles del cliente</div>
                <ul className="grid gap-0.5">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Tipo de Documento
                    </span>
                    <span>
                      {docTipo === "80"
                        ? "CUIT"
                        : docTipo === "86"
                        ? "CUIL"
                        : docTipo === "96"
                        ? "DNI"
                        : docTipo === "99"
                        ? "Consumidor Final"
                        : "Desconocido"}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Número de Documento
                    </span>
                    <span>{!docNro ? "No ingresado" : docNro}</span>
                  </li>
                </ul>
                <Separator className="my-2" />

                <div className="font-semibold">Detalles de la factura</div>
                <ul className="grid gap-0.5">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Tipo de Comprobante
                    </span>
                    <span>
                      {cbteTipo === 0
                        ? "Comprobante básico"
                        : cbteTipo === 1
                        ? "Factura A"
                        : cbteTipo === 6
                        ? "Factura B"
                        : cbteTipo === 11
                        ? "Factura C"
                        : "No ingresado"}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Concepto</span>
                    <span>
                      {concepto === 1
                        ? "Productos"
                        : concepto === 2
                        ? "Servicios"
                        : concepto === 3
                        ? "Productos y Servicios"
                        : "No ingresado"}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tipo de Pago</span>
                    <span>
                      {paymentType === "cash"
                        ? "Efectivo"
                        : paymentType === "credit"
                        ? "Tarjeta de Crédito"
                        : paymentType === "debit"
                        ? "Tarjeta de Débito"
                        : paymentType === "mercadoPago"
                        ? "Mercado Pago"
                        : paymentType === "transfer"
                        ? "Transferencia"
                        : "No ingresado"}
                    </span>
                  </li>
                  {(cbteTipo === 1 || cbteTipo === 6) && (
                    <>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Importe Gravado
                        </span>
                        <span>
                          ${form.getValues("importeGravado").toFixed(2)}
                        </span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Importe Exento IVA
                        </span>
                        <span>
                          ${form.getValues("importeExentoIva").toFixed(2)}
                        </span>{" "}
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">IVA</span>
                        <span>{form.getValues("iva")}%</span>
                      </li>
                    </>
                  )}
                </ul>
                <Separator className="my-2" />

                <div className="font-semibold">Detalles de la compañía</div>
                <ul className="grid gap-0.5">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Razón Social</span>
                    <span>{form.getValues("razonSocial")}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">IIBB</span>
                    <span>{form.getValues("iibb")}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Domicilio Fiscal
                    </span>
                    <span>{form.getValues("domicilioFiscal")}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Inicio de Actividad
                    </span>
                    <span>{form.getValues("inicioActividad")}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Régimen Tributario
                    </span>
                    <span>{form.getValues("regimenTributario")}</span>
                  </li>
                </ul>
                <Separator className="my-2" />

                <div className="font-semibold">Información adicional</div>
                <ul className="grid gap-0.5">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Con entrega a domicilio
                    </span>
                    <span>{isdelivery ? "Sí" : "No"}</span>
                  </li>
                  {isdelivery && (
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Dirección de Entrega
                      </span>
                      <span>{form.getValues("deliveryAddress")}</span>
                    </li>
                  )}
                  {comments && (
                    <li className="flex flex-col">
                      <span className="text-muted-foreground">Comentarios</span>
                      <span>{form.getValues("comments")}</span>
                    </li>
                  )}
                </ul>
                <Separator className="my-2" />

                <div className="font-semibold">Usuario y Sucursal</div>
                <ul className="grid gap-0.5">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Usuario</span>
                    <span>{userName}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Sucursal</span>
                    <span>{userBranch}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-4 bg-muted/50 px-3 py-2 md:px-6 md:py-3 rounded-md">
              <Button variant="outline" type="button" onClick={handleView}>
                Volver
              </Button>

              <ButtonWithLoading
                loading={isSubmitting}
                loadingText="Emitiendo comprobante..."
                variant="gradient"
                size="sm"
                type="submit"
                disabled={!isValid}
              >
                Confirmar emisión
              </ButtonWithLoading>
            </CardFooter>
          </Card>
        </div>
      </form>
    </Form>
  );
}
