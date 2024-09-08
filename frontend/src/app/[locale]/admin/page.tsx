import CreateBranchForm from "@/components/admin/branches/CreateBranchForm";
import CreateCompanyForm from "@/components/admin/companyFroms/CreateCompanyForm";
import Dashboard from "@/components/admin/Dashboard";
import CreateUserForm from "@/components/admin/userForms/CreateUserForm";

export default function Page() {
  const companyId = "1ae9cc57-df39-48fc-be22-46b02a0632a1";

  const users = [
    { id: "123e4567-e89b-12d3-a456-426614174000", name: "Juan Pérez" },
    { id: "123e4567-e89b-12d3-a456-426614174001", name: "María García" },
    { id: "123e4567-e89b-12d3-a456-426614174002", name: "Carlos López" },
    { id: "123e4567-e89b-12d3-a456-426614174003", name: "Ana Martínez" },
    { id: "123e4567-e89b-12d3-a456-426614174004", name: "Luis Rodríguez" },
  ];

  return (
    // Dashboard del superadmin
    // Esta vista se va a mostrar si tienes permiso de superadmin
    // Hacer dashboard lista de compañias y al seleccionar una 
    //se va a la vista de esa compañia [companyId]
    //en esa vista se veran los usuarios asociados y branches


    <main>
      {/* <Dashboard /> */}
      {/* <CreateUserForm companyId={companyId}/> */}
      {/* <CreateCompanyForm /> */}
          <CreateBranchForm companyId={companyId} users={users}/>
    </main>
  );
}
