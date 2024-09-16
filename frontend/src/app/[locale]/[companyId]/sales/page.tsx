import NoAccess from "@/components/common/NoAccess";
import SalesContainer from "@/components/sales/SalesContainer";
import ProductsServices from "@/services/products/ProductsServices";
import { cookies } from "next/headers";
import UsersServices from "@/services/user/UsersServices";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: {
    locale: string;
    companyId: string;
  };
}) {
  const { companyId, locale } = params;
  const cookiesStore = cookies();
  const session = cookiesStore.get("session")?.value;

  if (!session) {
    redirect(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/`);
  }

  const userId = JSON.parse(session)?.dataUser?.id;

  const [userData, products] = await Promise.all([
    UsersServices.get(userId),
    ProductsServices.getAll(companyId),
  ]);

  const userBranch = userData?.user?.branch ? 
    `${userData.user.branch.ptoVta} - ${userData.user.branch.name}` : "";

  return (
    <main>
      {session ? (
        <SalesContainer products={products} userBranch={userBranch} />
      ) : (
        <NoAccess locale={locale} />
      )}
    </main>
  );
}
