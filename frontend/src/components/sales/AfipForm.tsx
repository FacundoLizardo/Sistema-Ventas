"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useMemo } from "react";
import { FaEdit } from "react-icons/fa";
import { ICompany } from "@/services/companies/CompaniesServices";
import useCustomer from "@/hooks/useCustomer";
import { AlertTriangle, CheckCircle2, SearchIcon } from "lucide-react";
import { useSales } from "@/context/salesContext";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./SalesContainer";
import { getCustomerName } from "@/lib/getCustomerName";

type AfipFormProps = {
  form: UseFormReturn<FormValues>;
  company: ICompany;
  companyId: string;
  handleClientModal: () => void;
};

export default function AfipForm({
  company,
  companyId,
  form,
  handleClientModal,
}: AfipFormProps) {
  const { loading, customer, error, loadCustomer, setError, setCustomer } =
    useCustomer();
  const { totalPriceWithDiscount } = useSales();
  const cbteTipo = form.watch("cbteTipo");
  const docNro = (form.watch("docNro") || "").toString();
  const docTipo = (form.watch("docTipo") || "").toString();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      loadCustomer(companyId, docTipo, docNro);
    }
  };

  const handleGetClient = () => {
    loadCustomer(companyId, docTipo, docNro);
  };

  const customerName = useMemo(() => getCustomerName(customer), [customer]);

  useEffect(() => {
    if (docTipo) {
      form.setValue("docNro", "");
    }
  }, [docTipo, form]);

  useEffect(() => {
    const iva = cbteTipo === 1 || cbteTipo === 6 ? 21 : 0;
    form.setValue("iva", iva);
  }, [cbteTipo, form]);

  return (
    <Form {...form}>
      <form className="space-y-4">
        <Card>
          <div className="grid md:grid-cols-2 gap-4">
            <CardHeader>
              <CardTitle>Facturación</CardTitle>
              <CardDescription>
                Completa este formulario para gestionar la información necesaria
                para AFIP y emitir tu comprobante correctamente. Asegúrate de
                revisar cada campo antes de enviar.
              </CardDescription>
            </CardHeader>
            <CardHeader>
              <div className="text-xs border p-2 rounded text-muted-foreground">
                <p>
                  Razón Social:{" "}
                  <span className="font-bold text-card-foreground">
                    {company.razonSocial}
                  </span>
                </p>
                <p>
                  CUIT:{" "}
                  <span className="font-bold text-card-foreground">
                    {company.cuit}
                  </span>
                </p>
                <p>
                  Domicilio Fiscal:{" "}
                  <span className="font-bold text-card-foreground">
                    {company.domicilioFiscal}
                  </span>
                </p>
                <p>
                  Inicio de Actividad:{" "}
                  <span className="font-bold text-card-foreground">
                    {company.inicioActividad}
                  </span>
                </p>
                <p>
                  Régimen Tributario:{" "}
                  <span className="font-bold text-card-foreground">
                    {company.regimenTributario}
                  </span>
                </p>
                <p>
                  IIBB:{" "}
                  <span className="font-bold text-card-foreground">
                    {company.iibb}
                  </span>
                </p>
              </div>
            </CardHeader>
          </div>
          <CardContent>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="docTipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Documento</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value?.toString()}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="80">CUIT</SelectItem>
                          <SelectItem value="86">CUIL</SelectItem>
                          <SelectItem value="96">DNI</SelectItem>
                          <SelectItem value="99">Consumidor Final</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="docNro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Documento</FormLabel>
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          type="string"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value);
                            setError(null);
                            setCustomer(null);
                          }}
                          value={field.value === "0" ? "" : field.value}
                          onKeyDown={handleKeyPress}
                        />
                        <button
                          className="absolute inset-y-0 right-0 flex items-center px-2"
                          type="button"
                          onClick={handleGetClient}
                        >
                          <SearchIcon className="text-background size-5" />
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Datos del cliente</FormLabel>
                <Button
                  variant={"outline"}
                  type="button"
                  className="flex h-10 w-full rounded-md border border-input px-3 text-sm ring-offset-background"
                  disabled={loading}
                  onClick={handleGetClient}
                >
                  {!customer && !error && <FaEdit />}

                  {!customer && error && (
                    <AlertTriangle className="text-destructive" />
                  )}

                  {customer && !error && (
                    <>
                      <CheckCircle2 className="text-constructive" />
                    </>
                  )}

                  <div className="truncate overflow-hidden whitespace-nowrap w-56">
                    {loading ? (
                      "Cargando cliente..."
                    ) : docNro ? (
                      <>
                        {!customer ? (
                          error ? (
                            <div className="flex justify-center">{error}</div>
                          ) : (
                            "Presione Enter o haga click..."
                          )
                        ) : (
                          customerName
                        )}
                      </>
                    ) : (
                      "Ingresa un cliente"
                    )}
                  </div>
                  {!customer && error && (
                    <Button
                      variant={"default"}
                      className="h-6"
                      type="button"
                      onClick={handleClientModal}
                    >
                      Crear
                    </Button>
                  )}
                </Button>
              </FormItem>

              <FormField
                control={form.control}
                name="cbteTipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Comprobante</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value, 10))
                        }
                        defaultValue={field.value.toString()}
                        value={field.value.toString()}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Comprobante básico</SelectItem>
                          <SelectItem value="1">Factura A</SelectItem>
                          <SelectItem value="6">Factura B</SelectItem>
                          <SelectItem value="11">Factura C</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="concepto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Concepto</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value, 10))
                        }
                        defaultValue={field.value.toString()}
                        value={field.value.toString()}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Productos</SelectItem>
                          <SelectItem value="2">Servicios</SelectItem>
                          <SelectItem value="3">
                            Productos y Servicios
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Pago</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Efectivo</SelectItem>
                          <SelectItem value="credit">
                            Tarjeta de Crédito
                          </SelectItem>
                          <SelectItem value="debit">
                            Tarjeta de Débito
                          </SelectItem>
                          <SelectItem value="mercadoPago">
                            Mercado Pago
                          </SelectItem>
                          <SelectItem value="transfer">
                            Transferencia
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {cbteTipo === 1 || cbteTipo === 6 ? (
                <>
                  <FormItem>
                    <FormLabel>Importe Gravado</FormLabel>
                    <div className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background">
                      <div className="truncate overflow-hidden whitespace-nowrap w-56">
                        {totalPriceWithDiscount()}
                      </div>
                    </div>
                  </FormItem>

                  <FormField
                    control={form.control}
                    name="importeExentoIva"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Importe Exento IVA</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} value={field.value} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="iva"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IVA</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} value={field.value} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
