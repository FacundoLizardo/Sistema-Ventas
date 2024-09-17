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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
/* import { toast } from "sonner"; */
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

const formSchema = z.object({
  name: z.string().min(3, { message: "El nombre debe ser más largo." }),
  address: z.string().min(5, { message: "La dirección debe ser válida." }),
  country: z.string(),
  phoneNumbers: z
    .string()
    .regex(/^\d{7,}$/, {
      message:
        "El teléfono debe tener al menos 7 dígitos y contener solo números.",
    })
    .array(),
  cuit: z.string().regex(/^[0-9]{11}$/, {
    message: "El CUIT debe contener exactamente 11 dígitos.",
  }),
  isActive: z.boolean(),
});

export default function CreateCompanyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      country: "Argentina",
      phoneNumbers: [""],
      cuit: '',
      isActive: true,
    },
  });

  console.log(form.watch());

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    
    /* const request = postCompanyService({ ...data });
    toast.promise(request, {
      loading: "Creando la compañía...",
      success: () => {
        form.reset();
        return "Compañía creada exitosamente.";
      },
      error: "Error al crear la compañía.",
    }); */
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

  const { isDirty, isValid, isSubmitting } = form.formState;
  const submitDisabled = !isDirty || !isValid;
  const submitLoading = isSubmitting;

  return (
    <Card>
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Crear Compañía</CardTitle>
          </CardHeader>
          <CardContent className="md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name">Nombre</Label>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Nombre de la compañía"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="address">Dirección</Label>
                  <FormControl>
                    <Input
                      id="address"
                      placeholder="Dirección de la compañía"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <Card className="col-span-2 w-[50%]">
              <CardTitle>Telefonos de contacto</CardTitle>
              <CardDescription>
                Agregue los telefonos de contacto de la empresa
              </CardDescription>
              <CardContent>
                {form.getValues("phoneNumbers").map((_, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`phoneNumbers.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor={`phoneNumbers.${index}`}>
                          Número de Teléfono {index + 1}
                        </Label>
                        <FormControl>
                          <div className="flex gap-2">
                            <Input
                              id={`phoneNumbers.${index}`}
                              placeholder={`Número de Teléfono ${index + 1}`}
                              type="number"
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
                        <FormMessage />
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
              loading={submitLoading}
              loadingText="Creando compañía..."
              variant="default"
              className="flex flex-row items-center"
              type="submit"
              disabled={submitDisabled}
            >
              Crear Compañía
            </ButtonWithLoading>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
