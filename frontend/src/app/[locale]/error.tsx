"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
    router.push(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/`);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center gap-4 md:gap-8">
      <h2>¡Algo salió mal!</h2>
      <p className="mb-4">Lamentamos la inconveniencia. Por favor, intenta de nuevo.</p>
      <Button 
        onClick={handleTryAgain} 
      >
        Intentar de nuevo
      </Button>
    </div>
  );
}
