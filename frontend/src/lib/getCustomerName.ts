import { ICustomer } from "@/services/customers/CustomersServices";

export const getCustomerName = (customer: ICustomer | null) => {
  if (!customer) return "";

  if (customer.customerType === "company") {
    return customer.companyName || "";
  } else if (customer.customerType === "person") {
    return `${customer.firstName} ${customer.lastName}`;
  }
  return "";
};
