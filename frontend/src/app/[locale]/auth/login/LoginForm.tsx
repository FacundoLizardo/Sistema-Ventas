"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import AuthServices from "@/services/auth/AuthServices";
import ButtonWithLoading from "@/components/common/ButtonWithLoading";

const formSchema = z.object({
  email: z.string().email({ message: "Correo electrónico inválido" }),
  password: z
    .string()
    .min(6, { message: "El password debe tener al menos 6 caracteres." }),
});

export default function LoginClient({ locale }: { locale: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await AuthServices.login(data.email, data.password);

      const companyId = response.dataUser.companyId;

      const newURL = `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/${companyId}/sales`;

      window.location.href = newURL;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const { isDirty, isValid, isSubmitting, isSubmitSuccessful } = form.formState;
  const submitDisabled = !isDirty || !isValid;
  const submitLoading = isSubmitting || isSubmitSuccessful;

  return (
    <Card className="w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Ingrese su email y contraseña para ingresar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email">Email</Label>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="m@example.com"
                        autoComplete="email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
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
                        autoComplete="password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <CardFooter className="flex justify-between items-center">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:underline"
                prefetch={false}
              >
                ¿Olvidaste la contraseña?
              </Link>
              <ButtonWithLoading
                loading={submitLoading}
                loadingText="Ingresando..."
                variant="default"
                className="flex flex-row items-center"
                type="submit"
                disabled={submitDisabled}
              >
                Ingresar
              </ButtonWithLoading>
            </CardFooter>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
