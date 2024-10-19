import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { ProductInterface } from "./product";

export interface OperationInterface {
  id: number;
  products: ProductInterface[];
  amount: number;
  discount: number;
  extraCharge: number;
  debtAmount?: number;
  branchId?: string;
  paymentType: string;
  invoiceNumber?: string;
  state: string;
  isdelivery: boolean;
  deliveryAddress?: string;
  customer?: string;
  comments?: string;
  invoiceLink?: string;
  cbteTipo: number;
  user?: string;
}

export interface OperationCreationInterface
  extends Optional<
    OperationInterface,
    | "id"
    | "products"
    | "debtAmount"
    | "invoiceNumber"
    | "deliveryAddress"
    | "customer"
    | "comments"
    | "user"
  > {}

class Operation extends Model<OperationInterface, OperationCreationInterface> {}

export default (sequelize: Sequelize) => {
  Operation.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      products: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: [],
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      extraCharge: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      debtAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        validate: {
          isFloat: {
            msg: "The debt should be a decimal number.",
          },
          min: {
            args: [0],
            msg: "The amount of debt should be equal or higher than 0.",
          },
        },
      },
      branchId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      paymentType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "cash",
        validate: {
          isIn: [["credit", "debit", "cash", "mercadoPago", "transfer"]],
        },
      },
      invoiceNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
        validate: {
          isIn: [["completed", "pending", "cancelled", "failed", "voided"]],
        },
      },
      isdelivery: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      deliveryAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      customer: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      comments: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      invoiceLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cbteTipo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      user: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Operation",
      timestamps: true,
    }
  );

  return Operation;
};
