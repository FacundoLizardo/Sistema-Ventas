"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { IoMdClose } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import ButtonWithLoading from "./ButtonWithLoading";
import { toast } from "sonner";
import CustomersServices from "@/services/customers/CustomersServices";
import { Button } from "../ui/button";

// Esquema de validación usando Zod
const formSchema = z.object({
  customerType: z.enum(["person", "company"], {
    required_error: "Tipo de cliente es requerido",
  }),
  docTipo: z.string().nonempty("Requerido"),
  docNro: z.string().nonempty("Requerido"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  companyName: z.string().optional(),
  email: z.string().email({ message: "Email no es válido." }),
  address: z.string().optional(),
  phoneNumber: z.string().optional(),
});

type ClientModalProps = {
  open: boolean;
  onClose: () => void;
  companyId: string;
};

export default function ClientModal({
  open,
  onClose,
  companyId,
}: ClientModalProps) {
  if (!open) return null;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerType: "person",
      docNro: "",
      docTipo: "",
      firstName: "",
      lastName: "",
      companyName: "",
      email: "",
      address: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    const formattedData = {
      ...data,
      firstName: data.firstName?.toLowerCase(),
      lastName: data.lastName?.toLowerCase(),
      companyName: data.companyName?.toLowerCase(),
    };

    try {
      const request = await CustomersServices.post({
        params: formattedData,
        companyId,
      });

      toast.promise(Promise.resolve(request), {
        loading: "Creando el cliente...",
        success: () => {
          form.reset();
          onClose();
          return "El cliente fue creado con éxito.";
        },
        error: "Error al crear el cliente.",
      });
    } catch (error) {
      toast.error("Ocurrió un error inesperado.");
    }
  };

  const isPerson = form.watch("customerType") === "person";

  const { isDirty, isValid, isSubmitting } = form.formState;
  const submitDisabled = !isDirty || !isValid;
  const submitLoading = isSubmitting;

  return (
    <div className="fixed w-full min-h-screen inset-0 z-50 flex justify-center items-center bg-black/80">
      <Button
        className="absolute top-2 right-2"
        variant={"ghost"}
        size="icon"
        onClick={onClose}
      >
        <IoMdClose size={30} />
      </Button>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 md:space-y-4"
        >
          <Card className="w-full max-w-[90%] md:max-w-2xl m-auto">
            <CardHeader>
              <CardTitle>Crear o Editar un Cliente</CardTitle>
              <CardDescription>
                Elige el tipo de cliente a registrar{" "}
                <strong>Cliente Persona</strong> para un individuo o{" "}
                <strong>Cliente Empresa</strong> para una empresa.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid">
              <FormField
                control={form.control}
                name="customerType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Cliente</FormLabel>
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
                          <SelectItem value="person">Persona</SelectItem>
                          <SelectItem value="company">Compañía</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-2 md:gap-4">
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
                          {" "}
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {isPerson ? (
                              <>
                                <SelectItem value="80">CUIT</SelectItem>
                                <SelectItem value="86">CUIL</SelectItem>
                                <SelectItem value="96">DNI</SelectItem>
                              </>
                            ) : (
                              <SelectItem value="80">CUIT</SelectItem>
                            )}
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
                      <FormLabel>Número ID</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isPerson && (
                  <>
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apellido</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {!isPerson && (
                  <>
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Razón Social</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
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
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de Teléfono</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-4 bg-muted/50 px-3 py-2 md:px-6 md:py-4 rounded-md">
              <ButtonWithLoading
                loading={submitLoading}
                loadingText="Creando producto..."
                variant="default"
                className="flex flex-row items-center"
                size={"sm"}
                type="submit"
                disabled={submitDisabled}
              >
                Crear usuario
              </ButtonWithLoading>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
