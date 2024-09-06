"use client";
import ButtonWithLoading from "@/components/common/ButtonWithLoading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postUserService } from "@/services/users/postUserService";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const branchesList = [
  { id: "1ae9cc57-df39-48fc-be22-46b02a0632a1", name: "sucursal 1" },
  { id: "2", name: "sucursal 2" },
  { id: "3", name: "sucursal 3" },
  { id: "4", name: "sucursal 4" },
];

const formSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "El nombre tiene que ser más largo." }),
  lastName: z
    .string()
    .min(3, { message: "El apellido tiene que ser más largo." }),
  email: z.string().email({ message: "Debe ser un correo válido." }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
  address: z.string(),
  phoneNumber: z.string().regex(/^[0-9]+$/, {
    message: "El número de teléfono solo debe contener dígitos.",
  }),
  cuit: z.string().regex(/^[0-9]{11}$/, {
    message: "El CUIT debe contener exactamente 11 dígitos.",
  }),
  branch: z.string().array(),
  enabled: z.boolean(),
  role: z.string(),
});

export default function CreateUserForm({ companyId }: { companyId: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      password: undefined,
      address: undefined,
      phoneNumber: undefined,
      cuit: undefined,
      branch: [],
      enabled: true,
      role: "BASIC",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log({ data });
    console.log("en el submit");


    const request = postUserService({ companyId, ...data });

    toast.promise(request, {
      loading: "Creando el usuario...",
      success: () => {
        form.reset();
        return "El usuario fue creado con exito.";
      },
      error: "Error al crear el usuario.",
    });
  };

  console.log("datos del formulario", form.watch());

  const { isDirty, isValid, isSubmitting } = form.formState;
  const submitDisabled = !isDirty || !isValid;
  const submitLoading = isSubmitting;

  useEffect(() => {
    console.log("Is Valid:", isValid);
    console.log("Form Errors:", form.formState.errors);
  }, [isValid, form.formState.errors, form.formState]);

  return (
    <Card>
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Crear Usuario</CardTitle>
          </CardHeader>
          <CardContent className="md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="firstName">Nombre</Label>
                  <FormControl>
                    <Input
                      id="firstName"
                      placeholder="Ingrese el nombre del usuario"
                      {...field}
                    />
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
                  <Label htmlFor="lastName">Apellido</Label>
                  <FormControl>
                    <Input
                      id="lastName"
                      placeholder="Ingrese el apellido del usuario"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value =
                          e.target.value === "" ? undefined : e.target.value;
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Correro electrónico</Label>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="ejemplo@ejemplo.com"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value =
                          e.target.value === "" ? undefined : e.target.value;
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="password">Contraseña</Label>
                  <FormControl>
                    <Input
                      id="password"
                      placeholder="Ingrese la contraseña"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value =
                          e.target.value === "" ? undefined : e.target.value;
                        field.onChange(value);
                      }}
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
                      placeholder="Dirección del usuario"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value =
                          e.target.value === "" ? undefined : e.target.value;
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="phoneNumber">Número de telefono</Label>
                    <FormControl>
                      <Input
                        id="phoneNumber"
                        placeholder="(123) 456-7890"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const value =
                            e.target.value === "" ? undefined : e.target.value;
                          field.onChange(value);
                        }}
                      />
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
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const value =
                            e.target.value === "" ? undefined : e.target.value;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => {
                const selectedBranchNames = field.value.length
                  ? field.value
                      .map(
                        (id: string) =>
                          branchesList.find((branch) => branch.id === id)?.name
                      )
                      .join(", ")
                  : "Seleccione una o más sucursales";

                return (
                  <FormItem className="flex flex-col justify-between">
                    <Label htmlFor="branch">Sucursales</Label>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className={`mt-0 bg-white justify-between
                             ${
                               selectedBranchNames ===
                               "Seleccione una o más sucursales"
                                 ? "text-gray-400"
                                 : "text-black"
                             }
                          `}
                          >
                            {selectedBranchNames}
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          {branchesList.map((branch) => (
                            <DropdownMenuCheckboxItem
                              key={branch.id}
                              checked={field.value?.includes(branch.id)}
                              onCheckedChange={(checked) => {
                                const currentValue = field.value || [];
                                if (checked) {
                                  field.onChange([...currentValue, branch.id]);
                                } else {
                                  field.onChange(
                                    currentValue.filter(
                                      (id: string) => id !== branch.id
                                    )
                                  );
                                }
                              }}
                            >
                              {branch.name}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="enabled"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="enabled">Estado del usuario</Label>
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="role">Rol del usuario</Label>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      {...field}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={"OWNER"}>OWNER</SelectItem>
                        <SelectItem value={"ADMIN"}>ADMIN</SelectItem>
                        <SelectItem value={"BASIC"}>BASIC</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <ButtonWithLoading
              loading={submitLoading}
              loadingText="Creando producto..."
              variant="default"
              className="flex flex-row items-center"
              type="submit"
              disabled={submitDisabled}
            >
              Crear usuario
            </ButtonWithLoading>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
