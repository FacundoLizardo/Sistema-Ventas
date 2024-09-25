import { ICompany } from "@/services/companies/companiesServices";

export default function CompanyCard({ company: company }: { company: ICompany }) {
  return (
    <div className="w-full bg-gray-400 rounded-md shadow-sm">
      <div className="flex items-center justify-between h-[45px] px-4">
          <div className="text-card-foreground font-medium">
            {company.name}
          </div>
      </div>
    </div>
  );
}
