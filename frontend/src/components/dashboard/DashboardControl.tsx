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

export default function DashboardControl({
  operations,
}: DashboardControlProps) {
  return (
    <div>
      <Tabs defaultValue="history">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="history">
          <UserMonitoring operations={operations} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
