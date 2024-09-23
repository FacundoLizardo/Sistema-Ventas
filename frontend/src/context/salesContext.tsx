"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { AfipProducts } from "@/services/products/ProductsServices";
import { toast } from "sonner";

type ContextType = {
  products: AfipProducts[];
  discount: number;
  addProduct: (product: AfipProducts) => void;
  removeProduct: (productId: string) => void;
  getTotalPrice: () => number;
  setDiscount: (discount: number) => void;
};

const SalesContext = createContext<ContextType>({
  products: [],
  discount: 0,
  addProduct: () => {},
  removeProduct: () => {},
  getTotalPrice: () => 0,
  setDiscount: () => {},
});

export const SalesContextProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<AfipProducts[]>([]);
  const [discount, setDiscount] = useState<number>(0);

  const addProduct = (product: AfipProducts) => {
    setProducts((prevProducts) => [...prevProducts, product]);
    toast.success("Producto agregado a la lista");
  };

  const removeProduct = (productId: string) => {
    setProducts((prevProducts) => {
      const indexToRemove = prevProducts.findIndex(
        (product) => product.id === productId
      );

      if (indexToRemove === -1) {
        return prevProducts;
      }

      const updatedProducts = [...prevProducts];

      updatedProducts.splice(indexToRemove, 1);

      return updatedProducts;
    });
    toast.success("Producto eliminado correctamente");
  };

  const getTotalPrice = () => {
    return products.reduce(
      (total, product) => total + (product.finalPrice || 0),
      0
    );
  };

  return (
    <SalesContext.Provider
      value={{
        products,
        discount,
        addProduct,
        getTotalPrice,
        removeProduct,
        setDiscount,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};

export const useSales = () => {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error("useSales must be used within a SalesContextProvider");
  }
  return context;
};
