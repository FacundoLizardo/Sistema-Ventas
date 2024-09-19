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
import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { ICompany } from "@/services/companies/CompaniesServices";
import { useCustomer } from "@/context/customerContext";

const formSchema = z.object({
  products: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      finalPrice: z.number().positive(),
    })
  ),
  discount: z.number().nonnegative(),
  cbteTipo: z.number(),
  ptoVta: z.number(),
  concepto: z.number(),
  importeGravado: z.number().nonnegative(),
  importeExentoIva: z.number().nonnegative(),
  docNro: z.number().int(),
  docTipo: z.number(),
  iva: z.number().nonnegative(),
  outputDir: z.string(),
  paymentType: z.enum(["cash", "credit_card", "transfer"]),
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
  const { getTotalPrice, discount } = useSales();
  const { setCustomerData, setCompanyId } = useCustomer();

  const total = getTotalPrice();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      products: [],
      discount: discount,

      // Client
      docTipo: 80,

      // Invoice
      cbteTipo: 1,
      concepto: 1,
      paymentType: "cash",
      importeGravado: total,
      importeExentoIva: 0,
      iva: 0,

      // Company
      outputDir: "",
      ptoVta: 1,

      // Info additional
      isdelivery: false,
      deliveryAddress: "",
      comments: "",

      // User
      branchId: "",
      userId: "",
    },
  });

  const cbteTipo = useWatch({ control: form.control, name: "cbteTipo" });

  useEffect(() => {
    const iva = cbteTipo === 1 || cbteTipo === 6 ? 21 : 0;
    form.setValue("iva", iva);
  }, [cbteTipo, form]);

  useEffect(() => {
    const docTipo = form.getValues().docTipo.toString();
    const docNro = form.getValues().docNro.toString();
    setCustomerData({
      docTipo,
      docNro,
    });
    setCompanyId(companyId);
  }, [form.getValues().docNro, form.getValues().docTipo, setCustomerData]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    // Aquí puedes hacer una llamada a una API para enviar los datos
  };

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
                        defaultValue={field.value.toString()}
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
                      <Input type="number" {...field} />
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
                >
                  <FaEdit />
                  <div className="truncate overflow-hidden whitespace-nowrap w-56">
                    asdsadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
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
                        {total}
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
                          <Input type="number" {...field} />
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
                          <Input type="number" {...field} />
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
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="outputDir"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Directorio de Salida</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*   <FormField
              control={form.control}
              name="isdelivery"
              render={({ field }) => (
                <FormItem>
                <FormLabel>¿Es Entrega?</FormLabel>
                <FormControl>
                <Input type="checkbox" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
                )}
                /> */}
              <FormField
                control={form.control}
                name="deliveryAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección de Entrega</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
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

            <CardFooter>
              {/* <ButtonWithLoading type="submit">Enviar</ButtonWithLoading> */}
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
