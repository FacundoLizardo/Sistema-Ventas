"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UserMonitoring from "./UserMonitoring";
import { IOperation } from "@/services/operations/OperationsServices";
import ClientsMonitoring from "./ClientsMonitoring";
import { ICustomer } from "@/services/customers/CustomersServices";

type DashboardControlProps = {
  userId: string;
  branchId: string;
  companyId: string;
  operations: IOperation[];
  customers: ICustomer[];
};

export default function DashboardControl({
  operations,
  customers,
  companyId,
}: DashboardControlProps) {
  return (
    <div>
      <Tabs defaultValue="history">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="history">Historial</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="history">
          <UserMonitoring operations={operations} />
        </TabsContent>
        <TabsContent value="clients">
          <ClientsMonitoring customers={customers} companyId={companyId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
