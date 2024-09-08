"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CompanyInterface } from "@/types";
import Link from "next/link";

interface DashboardProps {
  companies: CompanyInterface[];
}

export default function Component({ companies }: DashboardProps) {
  console.log({ companies });

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto py-8">
        <h1 className="mb-6 text-2xl font-bold">Compañías</h1>
        <div className="overflow-x-auto rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Propietario</TableHead>
                <TableHead>Sucursales</TableHead>
                <TableHead>Fecha de creacion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company) => {
                return (
                  <TableRow key={company.id}>
                    <Link href={`admin/${company.id}`}>
                      <TableCell className="font-medium">
                        {company.name}
                      </TableCell>
                    </Link>
                    <TableCell>El carlos</TableCell>
                    <TableCell>{company.branches?.length}</TableCell>
                    <TableCell>{company.createdAt.toString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
