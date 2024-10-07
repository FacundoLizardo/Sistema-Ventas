"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="w-full h-screen flex flex-col items-center justify-center text-center gap-4 md:gap-8">
        <h2 className="text-2xl font-bold">¡Ups! Algo salió mal.</h2>
        <Button variant="gradient" type="button" onClick={() => reset()}>
          Try again
        </Button>
      </body>
    </html>
  );
}
