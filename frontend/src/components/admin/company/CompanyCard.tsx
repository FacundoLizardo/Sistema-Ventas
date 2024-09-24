import { Button } from "@/components/ui/button";
import { ICompany } from "@/services/companies/CompaniesServices";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";

export default function CompanyCard({ company: company }: { company: ICompany }) {
  return (
    <div className="w-full bg-red-500 rounded-md shadow-sm max-h-[50px]">
      <div className="flex items-center justify-between h-10 px-4">
          <div className="text-card-foreground font-medium">
            {company.name}
          </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <MinusIcon className="h-4 w-4" />
          </Button>
          <div className="text-card-foreground">10</div>
          <Button variant="ghost" size="icon">
            <PlusIcon className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon">
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
