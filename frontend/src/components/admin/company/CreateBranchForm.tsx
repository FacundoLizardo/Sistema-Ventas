"use client";
import ButtonWithLoading from "@/components/common/ButtonWithLoading";
import {
  Card,
  CardContent,
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
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postBranchService } from "@/services/branches/postBranchService"; // Servicio de creación de sucursales
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
/* import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react"; */

const formSchema = z.object({
  ptoVta: z.number().min(1, { message: "El punto de venta debe ser válido." }),
  afipId: z.string(),
  name: z.string().min(3, { message: "El nombre debe ser más largo." }),
  location: z.string().min(5, { message: "La ubicación debe ser válida." }),
  isStorage: z.boolean().optional().default(false),
  enable: z.boolean().default(true),
  manager: z.string().array(),
  hours: z.string().optional(),
  phoneNumber: z.string().regex(/^\d{7,}$/, {
    message:
      "El teléfono debe tener al menos 7 dígitos y contener solo números.",
  }),
  companyId: z
    .string()
    .min(1, { message: "Debe proporcionar el ID de la compañía." }),
});

interface CreateBranchFormProps {
  companyId: string;
}

export default function CreateBranchForm({
  companyId,
}: CreateBranchFormProps) {
  const [openingTime, setOpeningTime] = useState("08:00");
  const [closingTime, setClosingTime] = useState("22:00");

  /* const users: string[] = [""] */

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ptoVta: 1,
      afipId: "",
      name: "",
      location: "",
      isStorage: false,
      enable: true,
      manager: [],
      hours: "",
      phoneNumber: "",
      companyId: companyId,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const request = postBranchService({ ...data });
    toast.promise(request, {
      loading: "Creando la sucursal...",
      success: () => {
        form.reset();
        return "Sucursal creada exitosamente.";
      },
      error: "Error al crear la sucursal.",
    });
  };

  const { isDirty, isValid, isSubmitting } = form.formState;
  const submitDisabled = !isDirty || !isValid;
  const submitLoading = isSubmitting;

  return (
    <Card>
      <Form {...form}>
        <form className="grid w-full gap-2 md:gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Crear Sucursal</CardTitle>
          </CardHeader>
          <CardContent className="sm:grid-cols-2 md:grid-cols-3">
            <FormField
              control={form.control}
              name="ptoVta"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="ptoVta">Punto de Venta</Label>
                  <FormControl>
                    <Input
                      id="ptoVta"
                      placeholder="Punto de Venta"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="afipId"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="afipId">ID de AFIP</Label>
                  <FormControl>
                    <Input
                      id="afipId"
                      placeholder="Ingrese el ID de AFIP"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name">Nombre</Label>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Nombre de la Sucursal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="location">Ubicación</Label>
                  <FormControl>
                    <Input
                      id="location"
                      placeholder="Ubicación de la Sucursal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isStorage"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="isStorage">¿Es Almacén?</Label>
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
                        <SelectItem value={"true"}>Si</SelectItem>
                        <SelectItem value={"false"}>No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="enable"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="enable">Estado de la sucursal</Label>
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

           {/*  <FormField
              control={form.control}
              name="manager"
              render={({ field }) => {
                const selectedManagerNames = field.value.length
                  ? field.value
                      .map(
                        (id: string) =>
                          users.find((user) => user.id === id)?.name
                      )
                      .join(", ")
                  : "Seleccione uno o más managers";

                return (
                  <FormItem className="flex flex-col justify-between">
                    <Label htmlFor="manager">Managers</Label>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className={`mt-0 bg-white justify-between
                             ${
                               selectedManagerNames ===
                               "Seleccione uno o más managers"
                                 ? "text-gray-400"
                                 : "text-black"
                             }
                          `}
                          >
                            {selectedManagerNames}
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          {users.map((user) => (
                            <DropdownMenuCheckboxItem
                              key={user.id}
                              checked={field.value?.includes(user.id)}
                              onCheckedChange={(checked) => {
                                const currentValue = field.value || [];
                                if (checked) {
                                  field.onChange([...currentValue, user.id]);
                                } else {
                                  field.onChange(
                                    currentValue.filter(
                                      (id: string) => id !== user.id
                                    )
                                  );
                                }
                              }}
                            >
                              {user.name}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                  </FormItem>
                );
              }}
            /> */}

            <FormField
              control={form.control}
              name="hours"
              render={({ field }) => {
                return (
                  <FormItem>
                    <Label htmlFor="hours">Horarios de atención</Label>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Input
                            id="openingTime"
                            placeholder="00:00"
                            type="time"
                            value={openingTime}
                            onChange={(e) => {
                              const newOpeningTime = e.target.value;
                              setOpeningTime(newOpeningTime);
                              field.onChange(
                                `${openingTime} AM - ${newOpeningTime} PM`
                              );
                            }}
                          />
                        </div>
                        <span className="mx-2">-</span>

                        <div className="flex items-center">
                          <Input
                            id="closingTime"
                            placeholder="00:00"
                            type="time"
                            value={closingTime}
                            onChange={(e) => {
                              const newClosingTime = e.target.value;
                              setClosingTime(newClosingTime);
                              field.onChange(
                                `${openingTime} AM - ${newClosingTime} PM`
                              ); // Actualiza el campo hours
                            }}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="phoneNumber">Teléfono</Label>
                  <FormControl>
                    <Input
                      id="phoneNumber"
                      placeholder="Teléfono de contacto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <ButtonWithLoading
              loading={submitLoading}
              loadingText="Creando sucursal..."
              variant="default"
              className="flex flex-row items-center"
              size={"sm"}
              type="submit"
              disabled={submitDisabled}
            >
              Crear Sucursal
            </ButtonWithLoading>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
