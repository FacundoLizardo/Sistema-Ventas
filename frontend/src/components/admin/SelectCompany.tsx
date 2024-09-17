"use client";
import React, { useState, ChangeEvent } from 'react';
import { SearchIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { ICompany } from '@/services/companies/CompaniesServices';
import { Badge } from '../ui/badge';

export default function SelectCompany({ companies }: { companies: ICompany[] }) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredCompanies, setFilteredCompanies] = useState<ICompany[]>(companies);
console.log(companies);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    setFilteredCompanies(
      companies.filter(company =>
        company.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compañías</CardTitle>
        <CardDescription>Selecciona una compañía</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-2 px-2 bg-accent rounded-md">
          <Input
            type="text"
            placeholder="Buscar compañía..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="bg-transparent border-none text-foreground"
          />
          <SearchIcon className="text-foreground mx-2" />
        </div>
      </CardContent>
      <CardFooter>
        {filteredCompanies.length > 0 ? (
          <ul>
            {filteredCompanies.map(company => (
              <li key={company.id} className="py-2">
                {company.name} 
                <Badge variant="default">Activa</Badge>
                <button>Seleccionar</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </CardFooter>
    </Card>
  );
}
