"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import ButtonWithLoading from "@/components/common/ButtonWithLoading";
import { login } from "@/services/auth/AuthServices";
import { useEffect, useState } from "react";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Correo electrónico no válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

export default function LoginClient({ locale }: { locale: string }) {
  const [globalError, setGlobalError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setGlobalError(null);
    try {
      const response = await login(data.email, data.password);

      const companyId = response.dataUser.companyId;

      const newURL = `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/${companyId}/`;

      window.location.href = newURL;
      form.reset();
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setGlobalError("Correo electrónico o contraseña incorrectos.");
      form.reset();
    }
  };

  const { isDirty, isValid, isSubmitting } = form.formState;
  const submitDisabled = !isDirty || !isValid;

  useEffect(() => {
    if (isDirty) {
      setGlobalError(null);
    }
  }, [isDirty]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
            <CardDescription>
              Por favor, ingrese su correo electrónico y contraseña para
              acceder.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Correo electrónico</Label>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="gpi360@example.com"
                      autoComplete="email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
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
                      {...field}
                      autoComplete="current-password"
                      type="password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {globalError && (
              <div className="text-sm font-medium text-destructive">
                {globalError}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col justify-between items-center gap-4 md:gap-6">
            <ButtonWithLoading
              loading={isSubmitting}
              loadingText="Ingresando..."
              variant="outline"
              className="flex flex-row items-center w-full"
              size={"sm"}
              type="submit"
              disabled={submitDisabled || isSubmitting}
            >
              Ingresar
            </ButtonWithLoading>
            <div className="text-xs text-muted-foreground text-center">
              Si tienes algún problema,{" "}
              <Link
                href="#"
                className="hover:underline text-primary"
                prefetch={false}
              >
                contáctanos
              </Link>{" "}
              o si no recuerdas tu contraseña,{" "}
              <Link
                href="#"
                className="hover:underline text-primary"
                prefetch={false}
              >
                recupérala aquí
              </Link>
              .
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}