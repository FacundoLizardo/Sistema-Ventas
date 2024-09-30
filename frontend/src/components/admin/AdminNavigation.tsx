"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { DoorClosed } from "lucide-react";
import { deleteAccessCookie } from "@/lib/AccessStatus";

export default function AdminNavigation({ locale }: { locale: string }) {
  const router = useRouter();

  const handleCloseApp = () => {
    deleteAccessCookie();

    router.push(
      `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/auth/login`
    );
    router.refresh();
  };

  return (
    <header className="sticky flex h-16 items-center gap-4 justify-between">
      <nav className="flex gap-4 md:gap-6">
        <Link
          href={`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/admin/app`}
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          General
        </Link>
      </nav>

      <div>
        <Button
          variant="destructive"
          size="icon"
          className="rounded-full"
          onClick={handleCloseApp}
        >
          <DoorClosed className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
