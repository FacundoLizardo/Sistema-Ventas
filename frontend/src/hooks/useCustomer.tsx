"use client";

import { ICustomer } from "@/services/customers/CustomersServices";
import { useState } from "react";
import customerService from "../services/customers/CustomersServices";

export default function useCustomer() {
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState<ICustomer | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadCustomer = async (
    companyId: string,
    docTipo: string,
    docNro: string
  ) => {
    if (!companyId || !docTipo || !docNro) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await customerService.get({
        companyId,
        docTipo,
        docNro,
      });
      if (response.customer) {
        setCustomer(response.customer);
      } else {
        setError("No encontrado");
        setCustomer(null);
      }
    } catch (error) {
      console.error("Error loading customer:", error);
      setError("Error en la búsqueda.");
      setCustomer(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    customer,
    error,
    setError,
    setCustomer,
    loadCustomer,
  };
}
