import CreateCompanyForm from "@/components/admin/company/CreateCompanyForm";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      {children}
      <div className="grid md:grid-cols-2 gap-4 my-4">
        <CreateCompanyForm />
       {/*  <CreateUserForm /> */}
      </div>
    </main>
  );
}
