"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

type GeneralMonitoringProps = {
  operations: IOperation[];
};

export default function GeneralMonitoring({
  operations,
}: GeneralMonitoringProps) {
  const handleOpenLink = (invoiceLink: string) => {
    window.open(invoiceLink, "_blank");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimas ventas</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[450px]">
          <Table>
            <TableCaption>
              Listado de las últimas operaciones realizadas
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {operations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    <p className="text-sm font-medium">
                      No hay operaciones registradas.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                operations.map((operation) => (
                  <TableRow key={operation.id}>
                    <TableCell>
                      <p className="text-sm font-medium leading-none">
                        {operation.customer}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(
                          operation.createdAt,
                          "dd/MM/yyyy '-' HH:mm 'hs'",
                          {
                            locale: es,
                          }
                        )}
                      </p>
                    </TableCell>
                    <TableCell>{operation.user}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant={"outline"}
                        onClick={() => handleOpenLink(operation.invoiceLink)}
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
  );
}
