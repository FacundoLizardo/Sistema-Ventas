import DashboardControl from "@/components/dashboard/DashboardControl";
import CustomersServices from "@/services/customers/CustomersServices";
import OperationsServices, {
  IOperation,
} from "@/services/operations/OperationsServices";
import UsersServices from "@/services/users/UsersServices";

export default async function Page({
  params: { companyId },
}: {
  params: {
    locale: string;
    companyId: string;
  };
}) {
  const { userId, branchId, isSuperAdmin, isOwner, isAdmin  } = await UsersServices.userSession();
  const startDate = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
  const endDate = new Date(new Date().setHours(23, 59, 59, 999)).toISOString();

  const [operationsData, customersData] = await Promise.all([
    OperationsServices.get({ companyId, startDate, endDate, userId }),
    CustomersServices.get({ companyId }),
  ]);

  const operations =
    operationsData?.operations?.sort((a: IOperation, b: IOperation) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }) || [];

  const customers = customersData?.customer || [];

  return (
    <main className="grid gap-4">
      <DashboardControl
        companyId={companyId}
        userId={userId}
        branchId={branchId}
        operations={operations}
        customers={customers}
        isSuperAdmin={isSuperAdmin}
        isOwner={isOwner}
        isAdmin={isAdmin}
      />
    </main>
  );
}
