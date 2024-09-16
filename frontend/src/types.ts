export interface BranchInterface {
    id: string;
    ptoVta: number;
    afipId?: string;
    name: string;
    location: string;
    isStorage?: boolean;
    enable?: boolean;
    manager?: string[];
    hours?: string;
    phoneNumber?: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface CompanyInterface {
    id: string;
    name: string;
    address?: string;
    country?: string;
    phoneNumbers?: string;
    cuit?: string;
    isActive: boolean;
    users?: UserInterface[];
    branches?: BranchInterface[];
    createdAt: Date;
  }

  export interface BranchCreation {
    ptoVta: number;
    name: string;
    location: string;
    afipId?: string;
    isStorage?: boolean;
    enable?: boolean;
    manager?: string[];
    hours?: string;
    phoneNumber?: string;
  }

  export interface CashRegisterInterface {
    id: string;
    userId: string;
    initialAmount: number;
    finalAmount?: number;
    income?: {
      amount: number;
      details: string;
    };
    egress?: {
      amount: number;
      details: string;
    };
    totalCashRegister: Array<any>;
    comments?: string;
  }

  export interface CashRegisterCreationInterface {
    id?: string;
    userId: string;
    initialAmount: number;
    finalAmount?: number;
    income?: {
      amount: number;
      details: string;
    };
    egress?: {
      amount: number;
      details: string;
    };
    totalCashRegister: Array<any>;
    comments?: string;
  }

export interface CustomerInterface {
    dni: string;
    firstName: string;
    lastName: string;
    email: string;
    address?: string;
    phoneNumber?: string;
    dateOfBirth?: Date;
    enableDebt?: boolean;
  }
  
  export interface CustomerCreationInterface {
    dni: string;
    firstName: string;
    lastName: string;
    email: string;
    address?: string;
    phoneNumber?: string;
    dateOfBirth?: Date;
    enableDebt?: boolean;
  }
  
export interface OfferInterface {
    id: string;
    products: string[];
    imageUrl?: string;
    discountPercentage: number;
    price: number;
  }
  
  export interface OfferCreationInterface {
    products: string[];
    imageUrl?: string;
    discountPercentage: number;
    price: number;
  }
  
  export interface OperationInterface {
    id: number;
    products: ProductInterface[];
    amount: number;
    discount: number;
    extraCharge: number;
    debtAmount?: number;
    branchId: string;
    paymentType: "credit" | "debit" | "cash" | "mercadoPago";
    invoiceNumber?: string;
    state: "completed" | "pending" | "cancelled" | "failed" | "voided";
    isDelivery: boolean;
    deliveryAddress?: string;
    customersId?: string;
    comments?: string;
  }

  export interface OperationCreationInterface {
    products: ProductInterface[];
    amount: number;
    discount: number;
    extraCharge: number;
    branchId: string;
    paymentType: "credit" | "debit" | "cash" | "mercadoPago";
    state: "completed" | "pending" | "cancelled" | "failed" | "voided";
    isDelivery: boolean;
    debtAmount?: number;
    invoiceNumber?: string;
    deliveryAddress?: string;
    customersId?: string;
    comments?: string;
  }

export interface ProductInterface {
	id: string;
	name: string;
	category?: string;
	cost?: number;
	finalPrice?: number;
	discount?: number;
	profitPercentage?: number;
	stock: number;
	allowNegativeStock: boolean;
	trackStock: boolean;
	minimumStock: number;
	enabled: boolean;
	notesDescription?: string;
	taxes?: number;
	barcode: string;
}

export interface ProductCreationInterface {
	name: string;
	category?: string;
	cost?: number;
	finalPrice?: number;
	discount?: number;
	profitPercentage?: number;
	stock: number;
	allowNegativeStock: boolean;
	trackStock: boolean;
	minimumStock: number;
	enabled: boolean;
	notesDescription?: string;
	taxes?: number;
	barcode: string;
}

export interface PurchaseInterface {
    id: string;
    supplierId?: string;
    products: ProductInterface[];
    amount: number;
    comments?: string;
    barcode?: string;
}

export interface PurchaseCreationInterface {
    supplierId?: string;
    products: ProductInterface[];
    amount: number;
    comments?: string;
    barcode?: string;
}

export interface SupplierInterface {
    id: string;
    location?: string;
    purchases?: string[];
    phoneNumber?: string;
    email: string;
    webUrl?: string;
    sellers?: string[];
    frecuentProducts?: string[];
}

export interface SupplierCreationInterface {
    location?: string;
    purchases?: string[];
    phoneNumber?: string;
    email: string;
    webUrl?: string;
    sellers?: string[];
    frecuentProducts?: string[];
}

export interface UserInterface {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address?: string;
    phoneNumber?: string;
    cuit?: string;
    branch?: string[];
    enabled: boolean;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserCreationInterface {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address?: string;
    phoneNumber?: string;
    cuit?: string;
    branch?: string[];
    enabled: boolean;
    role: string;
}