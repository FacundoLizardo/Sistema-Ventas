"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImProfile } from "react-icons/im";
import Link from "next/link";
import { IUser } from "@/services/users/UsersServices";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "El nombre es obligatorio." }),
  lastName: z.string().min(1, { message: "El apellido es obligatorio." }),
  email: z.string().email({
    message: "Introduce una dirección de correo electrónico válida.",
  }),
  address: z.string().optional(),
  phoneNumber: z.string().optional(),
  cuit: z.string().optional(),
  role: z.string().min(1, { message: "El rol es obligatorio." }),
  branchId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProfileForm({
  locale,
  companyId,
  user,
}: {
  locale: string;
  companyId: string;
  user: IUser;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address || "",
      phoneNumber: user.phoneNumber || "",
      cuit: user.cuit || "",
      role: user.role,
      branchId: user.branchId || "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    // Aquí puedes hacer una llamada a una API para actualizar el perfil del usuario
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Alert className="my-10">
          <ImProfile size={16} />
          <AlertTitle>Configura tu perfil</AlertTitle>
          <AlertDescription>
            Completa la información de tu perfil para que otros te conozcan
            mejor. Asegúrate de que todos los campos estén actualizados y
            correctos.
          </AlertDescription>
        </Alert>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Lucas" {...field} />
                </FormControl>
                <FormDescription>
                  Asegúrate de usar tu nombre real para una identificación
                  clara.
                </FormDescription>
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
                  <Input placeholder="Ej: Tamburlini" {...field} />
                </FormControl>
                <FormDescription>
                  Este campo es importante para tu identificación en la
                  plataforma.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="ejemplo@dominio.com" {...field} />
                </FormControl>
                <FormDescription>
                  Introduce una dirección de correo electrónico válida. Este
                  será el principal medio de contacto.
                </FormDescription>
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
                  <Input placeholder="Ej: Calle 123" {...field} />
                </FormControl>
                <FormDescription>
                  Tu dirección actual. Puede ser útil para propósitos de
                  verificación o correspondencia.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: 123-456-7890" {...field} />
                </FormControl>
                <FormDescription>
                  Tu número de teléfono. Asegúrate de introducir un número
                  válido para facilitar la comunicación.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cuit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CUIT</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: 20-12345678-9" {...field} />
                </FormControl>
                <FormDescription>
                  Número de CUIT para fines fiscales. Es opcional pero puede ser
                  requerido para algunas funciones.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            defaultValue={user.role}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={user.role}
                    disabled={
                      user.role !== "SUPER_ADMIN" && user.role !== "OWNER"
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SUPER_ADMIN">Equipo GPI</SelectItem>
                      <SelectItem value="OWNER">Responsable</SelectItem>
                      <SelectItem value="ADMIN">Líder</SelectItem>
                      <SelectItem value="BASIC">Usuario</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  El rol asignado dentro de la aplicación. Asegúrate de que
                  refleje tus responsabilidades actuales.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Card>
          <CardTitle>Configura tu Sucursal</CardTitle>
          <CardDescription>
            Selecciona la sucursal de venta que se aplicará a todas las
            operaciones en la aplicación. Asegúrate de elegir correctamente, ya
            que esta configuración impactará en todo el sistema.
          </CardDescription>
          <div>
            <Button variant={"outline"}>
              <Link
                href={`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/${companyId}/configuration/branch`}
              >
                Configurar Sucursal
              </Link>
            </Button>
          </div>
        </Card>

        <Button type="submit">Actualizar perfil</Button>
      </form>
    </Form>
  );
}
