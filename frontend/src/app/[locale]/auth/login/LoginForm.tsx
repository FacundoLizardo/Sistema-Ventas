"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import ButtonWithLoading from "@/components/common/ButtonWithLoading";
import { login } from "@/services/auth/AuthServices";

const formSchema = z.object({
  email: z.string().email({ message: "Correo electrónico no válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
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
      const response = await login(data.email, data.password);

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
            <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
            <CardDescription>
              Por favor, ingrese su correo electrónico y contraseña para
              acceder.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email">Correo electrónico</Label>
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
                        autoComplete="current-password"
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
                ¿Olvidaste tu contraseña?
              </Link>
              <ButtonWithLoading
                loading={submitLoading}
                loadingText="Ingresando..."
                variant="gradient"
                className="flex flex-row items-center"
                size={"default"}
                type="submit"
                disabled={submitDisabled || submitLoading} 
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
