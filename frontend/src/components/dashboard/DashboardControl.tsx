"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GeneralMonitoring from "./GeneralMonitoring";
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
      <Tabs defaultValue="general">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="2">2</TabsTrigger>
            <TabsTrigger value="3">3</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="general"><GeneralMonitoring operations={operations} /></TabsContent>
        <TabsContent value="2">Soy 2</TabsContent>
        <TabsContent value="3">Soy 3</TabsContent>
      </Tabs>
    </div>
  );
}
