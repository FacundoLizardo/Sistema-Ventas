"use client";

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSales } from "./salesContext";
import { ICompany } from "@/services/companies/CompaniesServices";
import AfipServices, { IAfip } from "@/services/afip/AfipServices";
import { toast } from "sonner";

const formSchema = z.object({
  products: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      finalPrice: z.number().positive(),
    })
  ),
  discount: z.number().nonnegative().optional(),

  // Client
  docTipo: z.number(),
  docNro: z.number().min(1),

  // Invoice
  cbteTipo: z.number(),
  concepto: z.number(),
  paymentType: z.enum(["credit", "debit", "cash", "mercadoPago", "transfer"]),
  importeGravado: z.number().nonnegative(),
  importeExentoIva: z.number().nonnegative(),
  iva: z.number().nonnegative(),

  // Company
  outputDir: z.string().optional().default("/"),
  ptoVta: z.number(),
  razonSocial: z.string(),
  iibb: z.string(),
  domicilioFiscal: z.string(),
  inicioActividad: z.string(),
  regimenTributario: z.string(),

  // Info additional
  isdelivery: z.boolean().optional().default(false),
  deliveryAddress: z.string().optional(),
  comments: z.string().optional(),

  // User
  branchId: z.string(),
  userId: z.string(),
});

export type FormValues = z.infer<typeof formSchema>;

type ContextType = {
  form: ReturnType<typeof useForm<FormValues>>;
  onSubmit: (data: FormValues) => void;
};

const AfipContext = createContext<ContextType | undefined>(undefined);

type AfipContextProviderProps = {
  children: ReactNode;
  company: ICompany;
  userBranchPtoVta: string;
  userId: string;
  branchId: string;
  companyId: string;
};

export const AfipContextProvider = ({
  children,
  company,
  userBranchPtoVta,
  userId,
  branchId,
  companyId,
}: AfipContextProviderProps) => {
  const { products, totalPrice, discount } = useSales();
  
  const loadFormData = () => {
    const storedData = localStorage.getItem("formData");
    return storedData ? JSON.parse(storedData) : {};
  };

  const initialFormData = {
    products,
    discount,

    // Client
    docTipo: 80,
    docNro: 0,

    // Invoice
    cbteTipo: 1,
    concepto: 1,
    paymentType: "cash",
    importeGravado: totalPrice(),
    importeExentoIva: 0,
    iva: 21,

    // Company
    outputDir: "",
    ptoVta: userBranchPtoVta,
    razonSocial: company.razonSocial,
    iibb: company.iibb,
    domicilioFiscal: company.domicilioFiscal,
    inicioActividad: company.inicioActividad,
    regimenTributario: company.regimenTributario,

    // Info additional
    isdelivery: false,
    deliveryAddress: "",
    comments: "",

    // User
    userId,
    branchId,

    ...loadFormData(),
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialFormData,
    mode: "onChange",
  });

  useEffect(() => {
    form.setValue(
      "products",
      products.map((product) => ({
        id: product.id,
        name: product.name,
        finalPrice: product.finalPrice ?? 0,
      }))
    );
  }, [products]);

  useEffect(() => {
    const formData = form.getValues();
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [form.watch()]);

  const onSubmit = async (data: IAfip) => {
    const request = AfipServices.post({
      companyId,
      params: data,
    });

    toast.promise(request, {
      success: () => {
        form.reset();
        return "Emitido";
      },
      error: "Error.",
    });
  };

  return (
    <AfipContext.Provider value={{ form, onSubmit }}>
      {children}
    </AfipContext.Provider>
  );
};

export const useAfip = () => {
  const context = useContext(AfipContext);
  if (!context) {
    throw new Error("useAfip must be used within an AfipContextProvider");
  }
  return context;
};
