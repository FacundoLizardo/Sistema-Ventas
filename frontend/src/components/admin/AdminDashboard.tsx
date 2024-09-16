"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoLogoAppleAr } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateUserForm from "./user/CreateUserForm";
import CreateBranchForm from "./branches/CreateBranchForm";

export function AdminDashboard({
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

  const companyIdSelected = "1";

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky flex h-16 items-center gap-4 justify-between">
        <nav className="flex gap-4 md:gap-6">
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Compañias
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
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

      <Tabs defaultValue="branch" className="w-full">
        <TabsList>
          <TabsTrigger value="branch">Crear sucursal</TabsTrigger>
          <TabsTrigger value="user">Crear usuario</TabsTrigger>
        </TabsList>
        <TabsContent value="branch">
          <CreateBranchForm companyId={companyIdSelected} />
        </TabsContent>
        <TabsContent value="user">
          <CreateUserForm companyId={companyIdSelected} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
