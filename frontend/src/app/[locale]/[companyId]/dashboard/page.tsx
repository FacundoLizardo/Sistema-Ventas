import DashboardControl from "@/components/dashboard/DashboardControl";
import OperationsServices, { IOperation } from "@/services/operations/OperationsServices";
import UsersServices from "@/services/users/UsersServices";

export default async function Page({
  params: { companyId },
}: {
  params: {
    locale: string;
    companyId: string;
  };
}) {
  const { userId, branchId } = await UsersServices.userSession();
  const startDate = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
  const endDate = new Date(new Date().setHours(23, 59, 59, 999)).toISOString();

  const [operationsData] = await Promise.all([
    OperationsServices.get({ companyId, startDate, endDate, userId }),
  ]);

  const operations = operationsData?.operations?.sort((a: IOperation, b: IOperation) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }) || [];

  return (
    <main className="grid gap-4">
      <DashboardControl
        companyId={companyId}
        userId={userId}
        branchId={branchId}
        operations={operations}
      />
    </main>
  );
}
