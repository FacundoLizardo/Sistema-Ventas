import { Sequelize, DataTypes, Model } from "sequelize";
import { validatePercentage } from "../utils/percentajeValidator";
import { StockInterface } from "./stock";

export interface ProductInterface {
  id: string;
  name: string;
  cost?: number;
  finalPrice?: number;
  discount?: number;
  profitPercentage?: number;
  allowNegativeStock: boolean;
  trackStock: boolean;
  minimumStock: number;
  enabled: boolean;
  notesDescription?: string;
  taxes?: number;
  barcode: string;
}

export interface ProductCreationInterface
  extends Omit<
    ProductInterface,
    | "id"
    | "cost"
    | "finalPrice"
    | "discount"
    | "profitPercentage"
    | "notesDescription"
    | "taxes"
  > {}

class Product extends Model<ProductInterface, ProductCreationInterface> {
  public static isPositive(value: number) {
    if (value < 0) {
      throw new Error("The value must be a positive number.");
    }
  }
  public static validateDiscount(value: number) {
    if (value < 0) {
      throw new Error("The discount must be a positive number.");
    } else if (value > 10000) {
      throw new Error("The discount must be less than 10000.");
    }
  }
}

export interface ProductWithStockCreationInterface extends ProductCreationInterface {
  stock?: StockInterface[];
  categoryId?: string;
  subCategoryId?: string;
}

export default (sequelize: Sequelize) => {
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 50],
        },
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isPositive: Product.isPositive,
        },
      },
      finalPrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isPositive: Product.isPositive,
        },
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        validate: {
          customValidation(value: number) {
            validatePercentage(value, 0, 100, "Profit Percentage");
          },
        },
      },
      profitPercentage: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isPositive: Product.validateDiscount,
        },
      },
      allowNegativeStock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      trackStock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      minimumStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      notesDescription: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 255],
        },
      },
      taxes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isPositive: Product.isPositive,
        },
      },
      barcode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
      timestamps: false,
    }
  );

  return Product;
};
