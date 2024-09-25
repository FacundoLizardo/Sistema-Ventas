import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ICompany } from "@/services/companies/companiesServices"
import CompanyCard from "./CompanyCard"

export const CompanyCardContainer = ({ companies }: { companies: ICompany[] }) => {
    return (
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between px-4">
            <div>
                NOMBRE
            </div>
            <div>
                FECHA DE CREACION 
            </div>
            <div>
                ESTADO
            </div>
        </CardHeader>
                    <CardContent >
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
        </CardContent>
      </Card>
    )
  }