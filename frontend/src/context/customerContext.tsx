"use client";
import CustomersServices, {
  ICustomer,
} from "@/services/customers/CustomersServices";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ICustomerData = {
  docTipo: string;
  docNro: string;
};

interface CustomerContextType {
  customer: ICustomer;
  customerData: ICustomerData;
  companyId: string;
  setCustomer: (customer: ICustomer) => void;
  setCustomerData: (customerDoc: ICustomerData) => void;
  setCompanyId: (companyId: string) => void;
}

const CustomerContext = createContext<CustomerContextType>({
  customer: {} as ICustomer,
  customerData: {} as ICustomerData,
  companyId: "",
  setCustomer: () => {},
  setCustomerData: () => {},
  setCompanyId: () => {},
});

export const CustomerContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [customer, setCustomer] = useState<ICustomer>({} as ICustomer);
  const [companyId, setCompanyId] = useState<string>("");
  const [customerData, setCustomerData] = useState<ICustomerData>({
    docTipo: "",
    docNro: "",
  });

  const fetchCustomerData = useCallback(async () => {
    if (customerData.docTipo && customerData.docNro) {
      try {
        const response = await CustomersServices.get({
          companyId: companyId,
          customerData,
        });
        setCustomer(response);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    }
  }, [customerData]);

  useEffect(() => {
    fetchCustomerData();
  }, [fetchCustomerData]);

  return (
    <CustomerContext.Provider
      value={{
        customer,
        customerData,
        companyId,
        setCustomer,
        setCustomerData,
        setCompanyId,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useContext must be used within a CustomerContextProvider");
  }
  return context;
};
