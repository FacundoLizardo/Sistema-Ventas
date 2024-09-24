"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ButtonWithLoading from "../common/ButtonWithLoading";
import { useSales } from "@/context/salesContext";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import useCustomer from "@/hooks/useCustomer";
import { Badge } from "../ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ICompany } from "@/services/companies/CompaniesServices";

const formSchema = z.object({
  products: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      finalPrice: z.number().positive(),
    })
  ),
  docTipo: z.number(),
  docNro: z.number(),
  discount: z.number().nonnegative(),
  cbteTipo: z.number(),
  ptoVta: z.number(),
  concepto: z.number(),
  importeGravado: z.number().nonnegative(),
  importeExentoIva: z.number().nonnegative(),
  iva: z.number().nonnegative(),
  outputDir: z.string(),
  paymentType: z.enum(["credit", "debit", "cash", "mercadoPago"]),
  isdelivery: z.boolean(),
  deliveryAddress: z.string().optional(),
  comments: z.string().optional(),
  branchId: z.string().optional(),
  userId: z.string(),
});

type AfipFormProps = {
  company: ICompany;
  companyId: string;
};

export default function AfipForm({ company, companyId }: AfipFormProps) {
  const {
    products,
    totalPrice,
    discount,
    totalPriceWithDiscount,
    setDiscount,
    setProducts,
  } = useSales();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      products,
      discount,

      // Client
      docTipo: 80,
      docNro: 0,

      // Invoice
      cbteTipo: 1,
      concepto: 1,
      paymentType: "cash",
      importeGravado: totalPrice(),
      importeExentoIva: 0,
      iva: 21,

      // Company
      outputDir: "",
      ptoVta: 1,

      // Info additional
      isdelivery: false,
      deliveryAddress: "",
      comments: "",
    },
  });

  const isdelivery = useWatch({ control: form.control, name: "isdelivery" });
  const cbteTipo = useWatch({ control: form.control, name: "cbteTipo" });
  const docNro = (
    useWatch({ control: form.control, name: "docNro" }) || ""
  ).toString();
  const docTipo = (
    useWatch({ control: form.control, name: "docTipo" }) || ""
  ).toString();

  const { loading, customer } = useCustomer({
    companyId,
    docNro,
    docTipo,
  });

  const customerName =
    customer?.customerType === "company"
      ? customer?.companyName || ""
      : customer?.customerType === "person"
      ? `${customer?.firstName} ${customer?.lastName}`
      : "";

  useEffect(() => {
    const iva = cbteTipo === 1 || cbteTipo === 6 ? 21 : 0;
    form.setValue("iva", iva);
  }, [cbteTipo, form]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const request = data;
    console.log("data:", request);
  };

  const { isDirty, isValid, isSubmitting } = form.formState;
  const submitDisabled = !isDirty || !isValid;

  return (
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="docTipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Documento</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value, 10))
                        }
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
                      <Input type="number" {...field} value={docNro} />
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
                  className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background gap-2"
                  disabled={loading}
                >
                  <FaEdit />
                  <div className="truncate overflow-hidden whitespace-nowrap w-56">
                    {docNro.length > 1 ? (
                      loading ? (
                        "Cargando cliente..."
                      ) : customer ? (
                        customerName
                      ) : (
                        <div className="flex justify-center gap-2">
                          No encontrado <Badge variant={"default"}>Crear</Badge>
                        </div>
                      )
                    ) : (
                      "Ingresa un cliente"
                    )}
                  </div>
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
                          <SelectItem value="credit_card">
                            Tarjeta de Crédito
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

            <div className="pt-4">
              <CardTitle>Información adicional</CardTitle>
            </div>
            <div className="flex gap-10">
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

            <CardFooter className="flex justify-end gap-4">
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
                      Esta acción no puede deshacerse. Esto reseteará el
                      formulario y limpiará todos los campos.
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

              <ButtonWithLoading
                loading={isSubmitting}
                loadingText="Emitiendo..."
                variant="default"
                size={"default"}
                type="submit"
                disabled={submitDisabled || isSubmitting}
              >
                Emitir factura
              </ButtonWithLoading>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
