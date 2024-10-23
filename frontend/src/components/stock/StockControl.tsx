"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SearchIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { IProductFull } from "@/services/products/ProductsServices";
import { Input } from "../ui/input";
import { useState } from "react";
import { useEditProduct } from "@/context/editProductContect";
import BranchStockTable from "./BranchStockTable";
import BranchesProductsTable from "./BranchesProductsTable";
import { IBranch } from "@/services/branches/BranchesServices";
import GlobalProductsTable from "./GlobalProductsTable";
import StockForm from "./StockForm";

type ProductControlProps = {
  products: IProductFull[];
  allProducts: IProductFull[];
  userId: string;
  branchId: string;
  isSuperAdmin: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  companyId: string;
  branchesData: IBranch[];
};

export default function StockControl({
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
            <TabsTrigger value="branch">Actual</TabsTrigger>
            <TabsTrigger value="branches">Por Sucursal</TabsTrigger>
            <TabsTrigger value="all" className="hidden sm:block">
              Global
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="branch" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stock de la Sucursal</CardTitle>
              <CardDescription>
                Gestiona el stock de productos en tu sucursal. Selecciona un
                producto y ajusta su cantidad según sea necesario para mantener
                un inventario actualizado.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex border rounded-md bg-background flex-1 items-center gap-2 mt-1.5">
                <Input
                  type="text"
                  placeholder="Buscar por nombre o cetegoría de producto o servicio..."
                  className="bg-transparent border-none text-primary"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchIcon className="text-muted-foreground size-5 mr-4" />
              </div>
              <BranchStockTable
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
          <StockForm companyId={companyId} />
        </TabsContent>
        <TabsContent value="branches">
          <Card>
            <CardHeader>
              <CardTitle>Stock por Sucursales</CardTitle>
              <CardDescription>
                Explora el inventario de productos y servicios en todas tus
                sucursales, presentado de manera clara y estructurada para un
                fácil seguimiento.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex border rounded-md bg-background flex-1 items-center gap-2 mt-1.5">
                <Input
                  type="text"
                  placeholder="Buscar por nombre o cetegoría de producto o servicio..."
                  className="bg-transparent border-none text-primary"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchIcon className="text-muted-foreground size-5 mr-4" />
              </div>
              <BranchesProductsTable
                allProducts={filteredAllProducts}
                branchesData={branchesData}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Stock Global de la Compañía</CardTitle>
              <CardDescription>
                Visualiza el inventario de productos a nivel global en toda la
                compañía. Obtén una perspectiva clara del stock disponible en
                todas las sucursales sin realizar modificaciones.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex border rounded-md bg-background flex-1 items-center gap-2 mt-1.5">
                <Input
                  type="text"
                  placeholder="Buscar por nombre o cetegoría de producto o servicio..."
                  className="bg-transparent border-none text-primary"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchIcon className="text-muted-foreground size-5 mr-4" />
              </div>
              <GlobalProductsTable allProducts={filteredAllProducts} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
