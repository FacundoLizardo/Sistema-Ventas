import DashboardControl from "@/components/dashboard/DashboardControl";
import OperationsServices from "@/services/operations/OperationsServices";
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
  // Fecha de inicio: inicio del día actual
  const startDate = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();

  // Fecha de fin: final del día actual
  const endDate = new Date(new Date().setHours(23, 59, 59, 999)).toISOString();

  const [operationsData] = await Promise.all([
    OperationsServices.get({ companyId, startDate, endDate }),
  ]);

  console.log("operationsData: ", operationsData);

  return (
    <main className="grid gap-4">
      <DashboardControl
        companyId={companyId}
        userId={userId}
        branchId={branchId}
      />
    </main>
  );
}
