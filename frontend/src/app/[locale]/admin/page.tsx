import SelectCompany from "@/components/admin/SelectCompany";
import CompaniesServices from "@/services/companies/CompaniesServices";
import UsersServices from "@/services/user/UsersServices";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const { role } = await UsersServices.userSession();

  if (role !== "ADMIN") {
    redirect(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/`);
  }

  const { companies } = await CompaniesServices.getAll();

  return (
    <main>
      <SelectCompany companies={companies} />
    </main>
  );
}
