"use client";

import { CardsContainer } from "@/components/sales/CardsContainer";
import SaleSeachBar from "@/components/sales/SaleSearchBar";
import { IProduct } from "@/services/products/ProductsServices";
import SelectedBranch from "../common/SelectedBranch";
import AfipForm from "./AfipForm";
import PaymentInformation from "./PaymentInformation";
import { ICompany } from "@/services/companies/CompaniesServices";
import AdditionalInformation from "./AdditionalInformation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSales } from "@/context/salesContext";
import AfipServices, { IAfip } from "@/services/afip/AfipServices";
import { toast } from "sonner";
import InvoiceSummary from "./InvoiceSummary";
import { useRouter } from "next/navigation";

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
  docTipo: z.string(),
  docNro: z.string().min(1),

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

type SalesContainerProps = {
  products: IProduct[];
  userBranch: string;
  company: ICompany;
  companyId: string;
  userId: string;
  branchId: string;
  userBranchPtoVta?: string;
  userName?: string;
};

export default function SalesContainer({
  products,
  userBranch,
  company,
  companyId,
  userId,
  branchId,
  userBranchPtoVta,
  userName,
}: SalesContainerProps) {
  const router = useRouter()
  const { productsSelected, discount, totalPrice } = useSales();
  const [showInvoiceSummary, setShowInvoiceSummary] = useState(false);
  const { setProducts, setDiscount } = useSales();

  const handleView = () => {
    setShowInvoiceSummary(!showInvoiceSummary);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      products: productsSelected,
      discount: 0,

      // Client
      docTipo: "80",
      docNro: "0",

      // Invoice
      cbteTipo: 1,
      concepto: 1,
      paymentType: "cash",
      importeGravado: 0,
      importeExentoIva: 0,
      iva: 21,

      // Company
      outputDir: "",
      ptoVta: Number(userBranchPtoVta),
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
    },
    mode: "onChange",
  });

  useEffect(() => {
    const validProducts = productsSelected.map((product) => ({
      ...product,
      finalPrice: product.finalPrice ?? 0,
    }));

    form.setValue("products", validProducts);
    form.setValue("importeGravado", totalPrice());
    form.setValue("discount", discount);
  }, [productsSelected, totalPrice, discount, form]);

  const onSubmit = async (data: IAfip): Promise<void> => {
    try {
      const request = await AfipServices.post({
        companyId,
        params: data,
      });

      toast.promise(
        Promise.resolve(request),
        {
          loading: "Creando el comprobante...",
          success: () => {
            form.reset();
            setProducts([]);
            setShowInvoiceSummary(false);
            setDiscount(0);
            router.refresh()
            return "Comprobante creado con éxito.";
          },
          error: "Error al crear el Comprobante.",
        }
      );

      console.log(request);

   /*  if (request.success) {
      const { afipInvoice } = request;
      
      if (afipInvoice.file) {
        try {
          const link = document.createElement('a');
          link.href = afipInvoice.file;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.error("Error al abrir la factura:", error);
          toast.error("No se pudo abrir la factura.");
        }
      } else {
        toast.error("No se encontró el archivo de la factura.");
      }
    } */
    } catch (error) {
      console.error(error);
      toast.error("Error.");
    }
  };

  console.log("datos", form.getValues());
  

  return (
    <div className="flex flex-col gap-4">
      {!showInvoiceSummary ? (
        <>
          <SelectedBranch branch={userBranch} />
          <SaleSeachBar products={products} />
          <CardsContainer />
          <AfipForm company={company} companyId={companyId} form={form} />
          <div className="grid md:grid-cols-2 gap-4">
            <AdditionalInformation form={form} />
            <PaymentInformation form={form} handleView={handleView} />
          </div>
        </>
      ) : (
        <InvoiceSummary
          userBranch={userBranch}
          userName={userName}
          form={form}
          handleView={handleView}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
}
