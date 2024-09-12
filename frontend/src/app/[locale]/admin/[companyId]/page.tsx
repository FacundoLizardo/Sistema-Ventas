import { getCompanyService } from "@/services/companies/getCompanyService";

export default async function Page({params}: {params: { companyId: string}}) {

    const comanyId = params.companyId;

    console.log({comanyId});
    

    const {company} = await getCompanyService(comanyId);
    
    console.log({company});
    

    return (
        <main>
            <h1>Company</h1>
        </main>
    );
}