"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { setAccessCookie } from "@/lib/AccessStatus";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AccessForm({ locale }: { locale: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === correctPassword) {
      setAccessCookie();

      router.push(
        `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/admin/app`
      );
    } else {
      setError("La contraseña ingresada es incorrecta. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="max-w-96">
        <CardHeader>
          <CardTitle>Acceso de Administrador</CardTitle>
          <CardDescription>Por favor, introduzca su contraseña para continuar.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
            className="border p-2"
          />
          <Button type="submit" variant={"gradient"}>
            Iniciar Sesión
          </Button>
        </CardContent>
        {error && <p className="text-red-500">{error}</p>}
        <CardFooter></CardFooter>
      </Card>
    </form>
  );
}
