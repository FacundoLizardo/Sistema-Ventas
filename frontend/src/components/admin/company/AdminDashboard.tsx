"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateUserForm from "./CreateUserForm";
import CreateBranchForm from "./CreateBranchForm";

export function AdminDashboard({}: {}) {
  const companyIdSelected = "1";

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="branch">Crear sucursal</TabsTrigger>
          <TabsTrigger value="user">Crear usuario</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          Acá va todo lo relacionado con la empresa
        </TabsContent>
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
