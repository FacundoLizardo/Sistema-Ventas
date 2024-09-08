import Dashboard from "@/components/admin/Dashboard";
import { getCompaniesService } from "@/services/companies/getCompaniesService";

export default async function Page({params}: {params: { locale: string}}) {
  const users = [
    { id: "123e4567-e89b-12d3-a456-426614174000", name: "Juan Pérez" },
    { id: "123e4567-e89b-12d3-a456-426614174001", name: "María García" },
    { id: "123e4567-e89b-12d3-a456-426614174002", name: "Carlos López" },
    { id: "123e4567-e89b-12d3-a456-426614174003", name: "Ana Martínez" },
    { id: "123e4567-e89b-12d3-a456-426614174004", name: "Luis Rodríguez" },
  ];

  try {
    const {companies} = await getCompaniesService();

    console.log({companies});
    
    return (
      <main> 
        <Dashboard companies={companies}/>
        {/* <CreateUserForm companyId={companyId}/> */}
        {/* <CreateCompanyForm /> */}
        {/* <CreateBranchForm companyId={companyId} users={users}/> */}
      </main>
    );
  } catch (error) {
    console.error(error);
    return (
      <main>
        <p>Hubo un error al cargar las compañías.</p>
      </main>
    );
  }
}
