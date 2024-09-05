import Dashboard from "@/components/admin/Dashboard";
import CreateUserForm from "@/components/admin/userForms/CreateUserForm";

export default function Page() {
  const companyId = "1ae9cc57-df39-48fc-be22-46b02a0632a1";
  return (
    // Dashboard del superadmin
    // Esta vista se va a mostrar si tienes permiso de superadmin
    <main>
      {/* <Dashboard /> */}
      <CreateUserForm companyId={companyId}/>
    </main>
  );
}
