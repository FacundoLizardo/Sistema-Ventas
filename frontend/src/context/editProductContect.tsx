"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { IProduct } from "@/services/products/ProductsServices";

interface ProductContextType {
  selectedProduct: IProduct | null;
  selectProduct: (product: IProduct | null) => void;
}

const EditProductContext = createContext<ProductContextType | undefined>(
  undefined
);

export const EditProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const selectProduct = (product: IProduct | null) => {
    setSelectedProduct(product);
  };

  return (
    <EditProductContext.Provider value={{ selectedProduct, selectProduct }}>
      {children}
    </EditProductContext.Provider>
  );
};

export const useEditProduct = () => {
  const context = useContext(EditProductContext);
  if (!context) {
    throw new Error(
      "useEditProductContext must be used within a ProductProvider"
    );
  }
  return context;
};
