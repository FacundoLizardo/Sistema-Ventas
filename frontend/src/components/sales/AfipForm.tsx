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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
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
  paymentType: z.enum(["cash", "credit_card", "transfer"]), // Ajusta los valores según tu caso
  isdelivery: z.boolean(),
  deliveryAddress: z.string().optional(),
  comments: z.string().optional(),
  branchId: z.string().optional(),
  userId: z.string(),
});

export default function AfipForm() {
  const { getTotalPrice } = useSales();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      products: [],
      discount: 0,
      cbteTipo: 1,
      ptoVta: 1,
      concepto: 1,
      importeGravado: 0,
      importeExentoIva: 0,
      docNro: 0,
      docTipo: 0,
      iva: 0,
      outputDir: "",
      paymentType: "cash",
      isdelivery: false,
      deliveryAddress: "",
      comments: "",
      branchId: "",
      userId: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    // Aquí puedes hacer una llamada a una API para enviar los datos
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formulario AFIP</CardTitle>
        <CardDescription>
          Completa este formulario para gestionar la información necesaria para
          AFIP. Asegúrate de revisar cada campo antes de enviar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                          <SelectValue placeholder="Selecciona un tipo de pago" />
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

              <FormField
                control={form.control}
                name="cbteTipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Comprobante</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
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
                      <Input type="number" {...field} />
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

              <FormField
                control={form.control}
                name="docTipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Documento</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Datos del cliente</FormLabel>
                <div>asdsad</div>
              </FormItem>

              <FormField
                control={form.control}
                name="importeGravado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Importe Gravado</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
            </div>

            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descuento</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              <ButtonWithLoading type="submit">Enviar</ButtonWithLoading>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
