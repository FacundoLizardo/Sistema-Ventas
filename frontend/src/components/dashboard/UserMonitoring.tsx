"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IOperation } from "@/services/operations/OperationsServices";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "../ui/table";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ClipboardCheck, Clock, DollarSign, ShoppingCart } from "lucide-react";

type UserMonitoringProps = {
  operations: IOperation[];
};

export default function UserMonitoring({ operations }: UserMonitoringProps) {
  const handleOpenLink = (invoiceLink: string) => {
    window.open(invoiceLink, "_blank");
  };

  const totalOperations = operations.length;
  const totalProducts = operations.reduce(
    (acc, operation) => acc + operation.products.length,
    0
  );
  const totalAmount = operations.reduce(
    (acc, operations) => acc + parseFloat(operations.amount),
    0
  );

  return (
    <div className="grid gap-4">
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Operaciones
            </CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOperations}</div>{" "}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Productos Vendidos
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Precio Total Vendido
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$ {totalAmount.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Última operación realizada
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {operations.length > 0 ? (
              <div className="text-2xl font-bold">
                {format(
                  new Date(operations[operations.length - 1].createdAt),
                  "HH:mm 'hs'"
                )}
              </div>
            ) : (
              <div className="text-sm font-medium">
                No hay operaciones registradas.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Ventas recientes</CardTitle>
            <CardDescription>
              Últimas ventas registradas el{" "}
              {format(new Date(), "EEEE dd 'de' MMMM 'de' yyyy", {
                locale: es,
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <Table>
                {operations.length > 0 ? (
                  <TableCaption>
                    Listado de las ventas más recientes
                  </TableCaption>
                ) : null}
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Comprobante</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {operations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        <p className="text-sm font-medium">
                          Aún no se han registrado ventas.
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    operations.map((operation) => (
                      <TableRow key={operation.id}>
                        <TableCell>
                          <p className="text-xs font-medium leading-none">
                            {operation.customer}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(
                              operation.createdAt,
                              "dd/MM/yyyy '-' HH:mm 'hs'",
                              {
                                locale: es,
                              }
                            )}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant={"outline"}
                            size={"sm"}
                            type="button"
                            className="text-xs"
                            onClick={() =>
                              handleOpenLink(operation.invoiceLink)
                            }
                          >
                            Ver comprobante
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" className="flex" />
              <ScrollBar orientation="vertical" className="flex" />
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resumen de ventas</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="grid gap-4">
                {operations.length === 0 ? (
                  <p className="text-sm font-medium">
                    No hay operaciones registradas.
                  </p>
                ) : (
                  operations.map((operation) => (
                    <div key={operation.id} className="flex items-center gap-4">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarFallback>
                          {operation.cbteTipo === 1
                            ? "A"
                            : operation.cbteTipo === 6
                            ? "B"
                            : operation.cbteTipo === 11
                            ? "C"
                            : "CB"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          {operation.cbteTipo === 1
                            ? "Factura A"
                            : operation.cbteTipo === 6
                            ? "Factura B"
                            : operation.cbteTipo === 11
                            ? "Factura C"
                            : "Comprobante Básico"}
                        </p>
                        {operation.invoiceNumber && (
                          <p className="text-xs text-muted-foreground">
                            N° {operation.invoiceNumber}
                          </p>
                        )}
                      </div>
                      <div className="ml-auto font-medium">
                        +${operation.amount}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <ScrollBar orientation="horizontal" className="flex" />
              <ScrollBar orientation="vertical" className="flex" />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
