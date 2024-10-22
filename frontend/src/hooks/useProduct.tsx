"use client";

import ProductsServices, { IProduct } from "@/services/products/ProductsServices";
import { useState } from "react";

export default function useProduct() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadProduct = async (
    companyId: string,
    name: string
  ) => {
    if (!companyId || !name) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await ProductsServices.get({
        companyId,
        name,
      });
      if (response.product) {
        setProduct(response.product);
      } else {
        setError("No encontrado");
        setProduct(null);
      }
    } catch (error) {
      console.error("Error loading product:", error);
      setError("Error en la búsqueda.");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    product,
    error,
    setError,
    setProduct,
    loadProduct,
  };
}
