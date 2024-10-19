"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import CategoriesForm from "./CategoriesForm";
import SubCategoriesForm from "./SubCategoriesForm";
import CategoriesControl from "./CategoryControl";
import { ISubCategory } from "@/services/subCetegories/SubCategoriesServices";
import { ICategory } from "@/services/cetegories/CategoriesServices";

export default function CategoriesContainer({
  categories,
  companyId,
  subCategories
}: {
  categories: ICategory[];
  subCategories: ISubCategory[];
  companyId: string;
}) {
  const [isSubCategoryFormActive, setIsSubCategoryFormActive] = useState(false);

  const handleView = (newValue: boolean) => {
    setIsSubCategoryFormActive(newValue);
  };

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Categorías y Subcategorías</CardTitle>
          <CardDescription>
            Organiza tus productos eficientemente creando categorías y
            subcategorías. Agrupa productos similares y mejora la estructura de
            tu inventario.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2">
          <CategoriesForm
            companyId={companyId}
            isSubCategoryFormActive={isSubCategoryFormActive}
          />

          <SubCategoriesForm
            handleView={handleView}
            companyId={companyId}
            isSubCategoryFormActive={isSubCategoryFormActive}
            categories={categories}
          />
        </CardContent>
      </Card>
      <div>
        <CategoriesControl companyId={companyId} categories={categories} subCategories={subCategories}/>
      </div>
    </div>
  );
}
