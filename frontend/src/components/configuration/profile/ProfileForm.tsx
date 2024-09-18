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
import { Textarea } from "@/components/ui/textarea";
import { ImProfile } from "react-icons/im";
import Link from "next/link";
import { IUser } from "@/services/user/UsersServices";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "El nombre de usuario debe tener al menos 2 caracteres.",
    })
    .max(30, {
      message: "El nombre de usuario no debe tener más de 30 caracteres.",
    }),
  email: z.string().email({
    message: "Introduce una dirección de correo electrónico válida.",
  }),
  bio: z.string().max(160).min(4),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  bio: "Soy desarrollador de software...",
};

export default function ProfileForm({
  locale,
  companyId,
  user,
}: {
  locale: string;
  companyId: string;
  user: IUser;
}) {
  console.log(user);
  
 
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Alert className="my-10">
          <ImProfile size={16} />

          <AlertTitle>Configura tu perfil</AlertTitle>
          <AlertDescription>
            Completa la información de tu perfil para que otros te conozcan
            mejor.
          </AlertDescription>
        </Alert>

        <div>
          <Link
            href={`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/${companyId}/configuration/branch`}
          >
            Branch
          </Link>
        </div> 

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input placeholder="Ej: usuario123" {...field} />
              </FormControl>
              <FormDescription>
                Este será tu nombre público. Es importante que uses tu nombre
                real.
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
                Tu correo puede ser visible para otros usuarios de tu companía.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biografía</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Cuéntanos un poco sobre ti"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Puedes mencionar a otros usuarios y organizaciones.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Actualizar perfil</Button>
      </form>
    </Form>
  );
}
