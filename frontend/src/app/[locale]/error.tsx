"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Ocurrió un error:", error);
  }, [error]);

  const handleTryAgain = () => {
    Cookies.remove("session");
    router.push(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/`);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center gap-4 md:gap-8">
      <AlertTriangle className="h-32 w-32 text-primary mb-4" />
      <h2 className="text-2xl font-bold">¡Ups! Algo salió mal.</h2>
      <p className="mb-4">Por favor, intenta volver a ingresar.</p>
      <Button onClick={handleTryAgain}>Intentar de nuevo</Button>
    </div>
  );
}
