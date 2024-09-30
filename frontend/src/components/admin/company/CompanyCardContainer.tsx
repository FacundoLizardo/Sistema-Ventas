import { Card, CardContent } from "@/components/ui/card"
import { ICompany } from "@/services/companies/CompaniesServices"
import CompanyCard from "./CompanyCard"

export const CompanyCardContainer = ({ companies }: { companies: ICompany[] }) => {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
        </CardContent>
      </Card>
    )
  }