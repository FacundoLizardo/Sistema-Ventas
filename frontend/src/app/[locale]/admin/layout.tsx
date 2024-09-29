import AdminNavigation from "@/components/admin/AdminNavigation";
import UsersServices from "@/services/users/UsersServices";

export default async function AdminLayout({
  children,
  params: { locale },
}: Readonly<{
  params: {
    locale: string;
  };
  children: React.ReactNode;
}>) {
  const { companyId } = await UsersServices.userSession();
  
  return (
    <main>
      <AdminNavigation locale={locale} companyId={companyId} />
      {children}
    </main>
  );
}
