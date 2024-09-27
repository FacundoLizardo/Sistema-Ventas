"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SearchIcon } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { IProduct } from "@/services/products/ProductsServices";
import { Input } from "../ui/input";
import BranchesProductsTable from "./BranchesProductsTable";
import { useState } from "react";

type ProductControlProps = {
  products: IProduct[];
  userId: string;
  companyId: string;
  branchId: string;
  categories: string[];
};

export default function ProductControl({
  products,
  branchId,
  companyId,
}: ProductControlProps) {
  const [searchTerm, setSearchTerm] = useState("");
  console.log(companyId);

  const filteredProducts = products.filter((product) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      (product.category &&
        product.category.toLowerCase().includes(lowerCaseSearchTerm))
    );
  });

  return (
    <div>
      <Tabs defaultValue="branch">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="branch">Inventario Actual</TabsTrigger>
            <TabsTrigger value="branches">Inventario Sucursales</TabsTrigger>
            <TabsTrigger value="all" className="hidden sm:block">
              Inventario Total
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="branch">
          <Card className="h-[460px]">
            <CardHeader className="flex h-12 flex-row items-center justify-between gap-4">
              <div className="flex border rounded-md bg-background flex-1 items-center gap-2 mt-1.5">
                <Input
                  type="text"
                  placeholder="Buscar por nombre o cetegoría de producto o servicio..."
                  className="bg-transparent border-none text-primary"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchIcon className="text-muted-foreground size-5 mr-4" />
              </div>
            </CardHeader>
            <CardContent>
              <BranchesProductsTable
                products={filteredProducts}
                branchId={branchId}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="branches">
          <Card className="h-[460px]">
            <CardHeader className="flex md:flex-row justify-between"></CardHeader>
            <CardContent></CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="all">
          <Card className="h-[460px]">
            <CardHeader className="flex md:flex-row justify-between"></CardHeader>
            <CardContent></CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
