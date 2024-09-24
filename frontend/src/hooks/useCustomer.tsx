"use client";

import { ICustomer } from "@/services/customers/CustomersServices";
import { useEffect, useState } from "react";
import customerService from "../services/customers/CustomersServices";

interface IUseCustomer {
  companyId: string;
  docTipo: string;
  docNro: string;
}

export default function useCustomer({
  companyId,
  docTipo,
  docNro,
}: IUseCustomer) {
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState<ICustomer | null>(null);

  const loadCustomer = async () => {
    if (!companyId || !docTipo || !docNro) {
      return;
    }
    setLoading(true);
    try {
      const response = await customerService.get({
        companyId,
        docTipo,
        docNro,
      });
      setCustomer(response.customer);
    } catch (error) {
      console.error("Error loading customer:", error);
      setCustomer(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomer();
  }, [companyId, docTipo, docNro]);

  return {
    loading,
    customer,
  };
}
