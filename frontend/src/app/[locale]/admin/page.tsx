import Dashboard from "@/components/admin/Dashboard";

export default function Page() {
  return (
    // Dashboard del superadmin
    // Esta vista se va a mostrar si tienes permiso de superadmin
    <main>
      <Dashboard />
    </main>
  );
}
