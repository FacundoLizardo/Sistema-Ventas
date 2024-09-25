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
import useCustomer from "@/hooks/useCustomer";
import { SearchIcon } from "lucide-react";

const formSchema = z.object({
  products: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      finalPrice: z.number().positive(),
    })
  ),
  discount: z.number().nonnegative().optional(),

  // Client
  docTipo: z.number(),
  docNro: z.number().min(1),

  // Invoice
  cbteTipo: z.number(),
  concepto: z.number(),
  paymentType: z.enum(["credit", "debit", "cash", "mercadoPago"]),
  importeGravado: z.number().nonnegative(),
  importeExentoIva: z.number().nonnegative(),
  iva: z.number().nonnegative(),

  // Company
  outputDir: z.string().optional().default("/"),
  ptoVta: z.number(),
  razonSocial: z.string(),
  iibb: z.string(),
  domicilioFiscal: z.string(),
  inicioActividad: z.string(),
  regimenTributario: z.string(),

  // Info additional
  isdelivery: z.boolean().optional().default(false),
  deliveryAddress: z.string().optional(),
  comments: z.string().optional(),

  // User
  branchId: z.string(),
  userId: z.string(),
});

type AfipFormProps = {
  company: ICompany;
  companyId: string;
  userId: string;
  branchId: string;
  userBranchPtoVta: string;
};

export default function AfipForm({
  company,
  companyId,
  userId,
  branchId,
  userBranchPtoVta,
}: AfipFormProps) {
  const {
    products,
    totalPrice,
    discount,
    totalPriceWithDiscount,
    setDiscount,
    setProducts,
  } = useSales();
  const { loading, customer, error, loadCustomer, setError, setCustomer } =
    useCustomer();
  const [isDialogOpen, setDialogOpen] = useState(false);

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
      ptoVta: Number(userBranchPtoVta),
      razonSocial: company.razonSocial,
      iibb: company.iibb,
      domicilioFiscal: company.domicilioFiscal,
      inicioActividad: company.inicioActividad,
      regimenTributario: company.regimenTributario,

      // Info additional
      isdelivery: false,
      deliveryAddress: "",
      comments: "",

      // User
      userId,
      branchId,
    },
    mode: "onChange",
  });

  console.log("datos del formulario:", form.getValues());

  const isdelivery = useWatch({ control: form.control, name: "isdelivery" });
  const cbteTipo = useWatch({ control: form.control, name: "cbteTipo" });
  const docNro = (
    useWatch({ control: form.control, name: "docNro" }) || ""
  ).toString();
  const docTipo = (
    useWatch({ control: form.control, name: "docTipo" }) || ""
  ).toString();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      loadCustomer(companyId, docTipo, docNro);
    }
  };

  const handleClient = () => {
    loadCustomer(companyId, docTipo, docNro);
  };

  const customerName =
    customer?.customerType === "company"
      ? customer?.companyName || ""
      : customer?.customerType === "person"
      ? `${customer?.firstName} ${customer?.lastName}`
      : "";

  useEffect(() => {
    if (docTipo) {
      form.setValue("docNro", 0);
    }
  }, [docTipo, form]);

  useEffect(() => {
    const iva = cbteTipo === 1 || cbteTipo === 6 ? 21 : 0;
    form.setValue("iva", iva);
  }, [cbteTipo, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Datos enviados:", data);
    const result = formSchema.safeParse(data);
    console.log("Resultado de validación:", result);

    if (!result.success) {
      console.error("Errores de validación:", result.error.format());
      return; // Detener la ejecución si hay errores
    }

    // Simular un envío con un retraso
    console.log("Empezando el envío...");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula un retraso de 2 segundos
      console.log("Factura emitida con éxito!"); // Mensaje de éxito
    } catch (error) {
      console.error("Error al emitir la factura:", error);
    } finally {
      form.reset();
    }
  };

  const handleOpenDialog = () => {
    setDialogOpen(true); 
  };

  const handleConfirm = () => {
    form.handleSubmit(onSubmit)();
    setDialogOpen(false);
    setDiscount(0);
    setProducts([]);
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
                      <div className="relative w-full">
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            field.onChange(value);
                            setError(null);
                            setCustomer(null);
                          }}
                          value={field.value === 0 ? "" : field.value}
                          onKeyDown={handleKeyPress}
                        />
                        <button
                          className="absolute inset-y-0 right-0 flex items-center px-2"
                          type="button"
                          onClick={handleClient}
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
                  className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background gap-2"
                  disabled={loading}
                >
                  <FaEdit />
                  <div className="truncate overflow-hidden whitespace-nowrap w-56">
                    {loading ? (
                      "Cargando cliente..."
                    ) : docNro ? (
                      <>
                        {!customer ? (
                          error ? (
                            <div className="flex justify-center gap-2">
                              <div>{error}</div>
                              <Badge variant={"default"}>Crear</Badge>
                            </div>
                          ) : (
                            "Presione Enter o haga clic en la lupa para buscar..."
                          )
                        ) : (
                          customerName
                        )}
                      </>
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
                type="button" 
                onClick={handleOpenDialog}
                disabled={submitDisabled}
              >
                Emitir factura
              </ButtonWithLoading>

              <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      ¿Estás seguro de que quieres emitir la factura?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no puede deshacerse. Por favor, confirma que
                      deseas continuar.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setDialogOpen(false)}>
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>
                      Confirmar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
