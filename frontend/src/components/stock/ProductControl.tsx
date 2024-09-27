"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SearchIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { IProduct } from "@/services/products/ProductsServices";
import { Input } from "../ui/input";
import BranchesProductsTable from "./BranchesProductsTable";
import { useState } from "react";
import CategoriesForm from "./CategoriesForm";
import { Switch } from "../ui/switch";
import SubCategoriesForm from "./SubCategoriesForm";

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
}: ProductControlProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCategoryFormActive, setIsCategoryFormActive] = useState(true);

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
            <TabsTrigger value="categories" className="hidden sm:block">
              Categorías
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
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Categorías y Subcategorías</CardTitle>
              <CardDescription>
                Facilita la organización de tus productos creando y gestionando
                categorías y subcategorías de manera eficiente. Las categorías
                te permiten agrupar productos similares, mientras que las
                subcategorías te ofrecen un nivel adicional de organización,
                asegurando que tu inventario esté perfectamente estructurado.
              </CardDescription>
            </CardHeader>
            <CardContent >
              <div className="flex items-center justify-evenly gap-4 bg-muted/50 px-3 py-2 md:px-6 md:py-4 rounded-md mt-2">
                <span className="text-lg font-semibold">Categorías</span>
                <Switch
                  checked={isCategoryFormActive}
                  onCheckedChange={() =>
                    setIsCategoryFormActive(!isCategoryFormActive)
                  }
                  aria-label={
                    isCategoryFormActive
                      ? "Activar Subcategorías"
                      : "Activar Categorías"
                  }
                />
                <span className="text-lg font-semibold">Subcategorías</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Formulario de Categorías */}
                <div className="relative">
                  <CategoriesForm />
                  {!isCategoryFormActive && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center pointer-events-none">
                      <span className="text-white text-lg">
                        Formulario bloqueado
                      </span>
                    </div>
                  )}
                </div>

                {/* Formulario de Subcategorías */}
                <div className="relative mt-4">
                  <SubCategoriesForm />
                  {isCategoryFormActive && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center pointer-events-none">
                      <span className="text-white text-lg">
                        Formulario bloqueado
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
