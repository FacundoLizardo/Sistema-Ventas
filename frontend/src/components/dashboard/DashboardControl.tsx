"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UserMonitoring from "./UserMonitoring";
import { IOperation } from "@/services/operations/OperationsServices";

type DashboardControlProps = {
  userId: string;
  branchId: string;
  companyId: string;
  operations: IOperation[];
};

export default function DashboardControl({operations}: DashboardControlProps) {
  return (
    <div>
      <Tabs defaultValue="history">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="history">Historial</TabsTrigger>
            <TabsTrigger value="2">2</TabsTrigger>
            <TabsTrigger value="3">3</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="history"><UserMonitoring operations={operations} /></TabsContent>
        <TabsContent value="2">Soy 2</TabsContent>
        <TabsContent value="3">Soy 3</TabsContent>
      </Tabs>
    </div>
  );
}
