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

export default function CategoriesContainer({
  categories,
  companyId,
}: {
  categories: { name: string; id: string }[];
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
            isSubCategoryFormActive={isSubCategoryFormActive}
          />
        </CardContent>
      </Card>
      <div>
        <CategoriesControl companyId={companyId} categories={categories}/>
      </div>
    </div>
  );
}
