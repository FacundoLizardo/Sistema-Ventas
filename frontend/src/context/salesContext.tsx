"use client";

import { AfipProducts } from "@/services/products/ProductsServices";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { toast } from "sonner";

type ContextType = {
  productsSelected: AfipProducts[];
  discount: number;
  setProducts: (productsSelected: AfipProducts[]) => void;
  addProduct: (product: AfipProducts) => void;
  removeProduct: (productId: string) => void;
  totalPrice: () => number;
  totalPriceWithDiscount: () => number;
  setDiscount: (discount: number) => void;
};

const SalesContext = createContext<ContextType>({
  productsSelected: [],
  discount: 0,
  setProducts: () => {},
  addProduct: () => {},
  removeProduct: () => {},
  totalPrice: () => 0,
  totalPriceWithDiscount: () => 0,
  setDiscount: () => {},
});

export const SalesContextProvider = ({ children }: { children: ReactNode }) => {
  const [productsSelected, setProducts] = useState<AfipProducts[]>([]);
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

  const totalPrice = () => {
    return productsSelected.reduce(
      (total, product) => total + (product.finalPrice || 0),
      0
    );
  };

  const totalPriceWithDiscount = () => {
    const total = totalPrice();

    const discountedTotal = (total - (total * discount) / 100);

    return discountedTotal;
  };

  return (
    <SalesContext.Provider
      value={{
        productsSelected,
        discount,
        addProduct,
        setProducts,
        totalPrice,
        totalPriceWithDiscount,
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
