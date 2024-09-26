"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SearchIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";

import { IProduct } from "@/services/products/ProductsServices";
import { Input } from "../ui/input";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import BranchesProductsTable from "./BranchesProductsTable";

type ProductControlProps = {
  products: IProduct[];
  userId: string;
  companyId: string;
  branchId: string;
};

export default function ProductControl({ products, branchId }: ProductControlProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Tabs defaultValue="branch">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="branch">Inventario Actual</TabsTrigger>
            <TabsTrigger value="branches">Inventario Sucursales</TabsTrigger>
            <TabsTrigger value="all">Inventario Total</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="branch">
          <Card className="h-[460px]">
            <CardHeader className="flex md:flex-row justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">
                  Control de productos
                </CardTitle>
                <CardDescription>
                  Gestiona tu stock de manera eficiente y optimiza tu
                  inventario.
                </CardDescription>
              </div>
              <div className="flex flex-row items-center gap-2 md:w-[40%] bg-card-foreground rounded-md">
                <Input
                  type="text"
                  placeholder="Buscar producto o servicio..."
                  className="bg-transparent border-none text-primary"
                  onClick={() => setOpen(!open)}
                />
                <SearchIcon className="text-background size-5 mr-4" />
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="flex flex-col h-[350px]">
                <BranchesProductsTable products={products} branchId={branchId} />
              </ScrollArea>
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
