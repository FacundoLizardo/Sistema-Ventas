"use client";
import ButtonWithLoading from "@/components/common/ButtonWithLoading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2Icon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CompaniesServices from "@/services/companies/CompaniesServices";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  razonSocial: z.string().min(3, { message: "El nombre debe ser más largo." }),
  domicilioFiscal: z
    .string()
    .min(5, { message: "La dirección debe ser válida." }),
  inicioActividad: z.string(),
  regimenTributario: z.string(),
  iibb: z.string(),
  country: z.string(),
  phoneNumbers: z
    .string()
    .regex(/^\d{7,}$/, {
      message:
        "El teléfono debe tener al menos 7 dígitos y contener solo números.",
    })
    .array().optional(),
  cuit: z.string().regex(/^[0-9]{11}$/, {
    message: "El CUIT debe contener exactamente 11 dígitos.",
  }),
  isActive: z.boolean(),
});

export default function CreateCompanyForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      razonSocial: "",
      domicilioFiscal: "",
      inicioActividad: "",
      regimenTributario: "",
      iibb: "",
      country: "Argentina",
      phoneNumbers: [""],
      cuit: "",
      isActive: true,
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Formulario enviado con datos:", data);
    const request = await CompaniesServices.post({
      params: data,
    });
    console.log("request", request);

    toast.promise(Promise.resolve(request), {
      loading: "Creando la compañia...",
      success: () => {
        form.reset();
        router.refresh();
        return "La compania fue creada con éxito.";
      },
      error: "Error al crear la compania.",
    });
  };

  const addPhoneNumber = () => {
    form.setValue("phoneNumbers", [...form.getValues("phoneNumbers"), ""]);
  };

  const removePhoneNumber = (index: number) => {
    const updatedPhones = form
      .getValues("phoneNumbers")
      .filter((_, i) => i !== index);
    form.setValue("phoneNumbers", [...updatedPhones]);
  };

  console.log("errores", form.formState.errors);

  const { isDirty, isValid, isSubmitting } = form.formState;
  const submitDisabled = !isDirty || !isValid;
  const submitLoading = isSubmitting;

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Crear Compañía</CardTitle>
          </CardHeader>
          <CardContent className="md:grid-cols-2">
            <FormField
              control={form.control}
              name="razonSocial"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="razonSocial">Nombre</Label>
                  <FormControl>
                    <Input
                      id="razonSocial"
                      placeholder="Nombre de la compañía"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="domicilioFiscal"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="domicilioFiscal">Dirección</Label>
                  <FormControl>
                    <Input
                      id="domicilioFiscal"
                      placeholder="Dirección de la compañía"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inicioActividad"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="inicioActividad">Inicio de Actividad</Label>
                  <FormControl>
                    <Input id="inicioActividad" type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="regimenTributario"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="regimenTributario">Régimen Tributario</Label>
                  <FormControl>
                    <Input
                      id="regimenTributario"
                      placeholder="Régimen tributario de la compañía"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="iibb"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="iibb">IIBB</Label>
                  <FormControl>
                    <Input
                      id="iibb"
                      placeholder="IIBB de la compañía"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="country">País</Label>
                  <FormControl>
                    <Input
                      id="country"
                      placeholder="País de la compañía"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="isActive">Estado de la Compañía</Label>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value === "true");
                      }}
                      defaultValue={String(field.value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={"true"}>Habilitado</SelectItem>
                        <SelectItem value={"false"}>Deshabilitado</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cuit"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="cuit">CUIT</Label>
                  <FormControl>
                    <Input
                      id="cuit"
                      placeholder="XX-XXXXXXXX-X"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Números de Teléfono</CardTitle>
                <CardDescription>
                  Agregue los números de contacto de la empresa.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {form.getValues("phoneNumbers").map((_, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`phoneNumbers.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor={`phoneNumbers.${index}`}>
                          Teléfono {index + 1}
                        </Label>
                        <FormControl>
                          <div className="flex gap-2">
                            <Input
                              id={`phoneNumbers.${index}`}
                              placeholder={`Número de Teléfono ${index + 1}`}
                              type="text"
                              {...field}
                            />
                            {index !== 0 && (
                              <Button
                                type="button"
                                onClick={() => removePhoneNumber(index)}
                                className="bg-red-500"
                              >
                                <Trash2Icon className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
                <Button
                  type="button"
                  onClick={addPhoneNumber}
                  className="mt-2 bg-gray-500"
                >
                  Agregar Teléfono
                </Button>
              </CardContent>
            </Card>
          </CardContent>
          <CardFooter>
            <ButtonWithLoading
              loadingText="Creando compañía..."
              variant="default"
              className="flex flex-row items-center"
              type="submit"
            >
              Crear Compañía
            </ButtonWithLoading>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
