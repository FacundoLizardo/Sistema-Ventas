"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { IoLogoAppleAr } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function AdminNavigation({
  locale,
  companyId,
}: {
  locale: string;
  companyId: string;
}) {
  const router = useRouter();

  const handleApp = () => {
    router.push(
      `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/${companyId}/sales`
    );
  };

  return (
    <header className="sticky flex h-16 items-center gap-4 justify-between">
      <nav className="flex gap-4 md:gap-6">
        <Link
          href={`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/admin/`}
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          Inicio
        </Link>
        <Link
          href={`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/admin/company`}
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          Compañias
        </Link>
        <Link
          href={`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/admin/statistics`}
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          Estadísticas
        </Link>
      </nav>

      <div>
        <Button
          variant="destructive"
          size="icon"
          className="rounded-full"
          onClick={handleApp}
        >
          <IoLogoAppleAr className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
