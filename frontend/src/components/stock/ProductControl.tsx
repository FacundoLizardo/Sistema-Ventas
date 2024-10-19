"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SearchIcon } from "lucide-react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { IProductFull } from "@/services/products/ProductsServices";
import { Input } from "../ui/input";
import { useState } from "react";
import { useEditProduct } from "@/context/editProductContect";
import BranchProductsTable from "./BranchProductsTable";
import BranchesProductsTable from "./BranchesProductsTable";
import { IBranch } from "@/services/branches/BranchesServices";
import GlobalProductsTable from "./GlobalProductsTable";

type ProductControlProps = {
  products: IProductFull[];
  allProducts: IProductFull[];
  userId: string;
  branchId: string;
  categories: string[];
  isSuperAdmin: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  companyId: string;
  branchesData: IBranch[];
};

export default function ProductControl({
  products,
  allProducts,
  branchId,
  companyId,
  isSuperAdmin,
  isOwner,
  isAdmin,
  branchesData,
}: ProductControlProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { selectProduct } = useEditProduct();

  const filteredProducts = products.filter((product) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      (product.category &&
        product.category.name.toLowerCase().includes(lowerCaseSearchTerm))
    );
  });

  const filteredAllProducts = allProducts.filter((product) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return product.name.toLowerCase().includes(lowerCaseSearchTerm);
  });

  return (
    <div>
      <Tabs defaultValue="branch">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="branch">Stock Actual</TabsTrigger>
            <TabsTrigger value="branches">Por Sucursal</TabsTrigger>
            <TabsTrigger value="all" className="hidden sm:block">
              Global
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
              <BranchProductsTable
                products={filteredProducts}
                selectProduct={selectProduct}
                branchId={branchId}
                companyId={companyId}
                isSuperAdmin={isSuperAdmin}
                isOwner={isOwner}
                isAdmin={isAdmin}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="branches">
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
                allProducts={filteredAllProducts}
                branchesData={branchesData}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="all">
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
              <GlobalProductsTable
                allProducts={filteredAllProducts}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
