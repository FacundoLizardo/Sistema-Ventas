import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { ProductInterface } from "./product";

export interface PurchaseInterface {
  id: string;
  supplierId?: string;
  products: ProductInterface[];
  amount: number;
  comments?: string;
  barcode?: string;
}

export interface PurchaseCreationInterface
  extends Optional<PurchaseInterface, "supplierId" | "comments" | "barcode"> {}
class Purchase extends Model<PurchaseInterface, PurchaseCreationInterface> {}

export default (sequelize: Sequelize) => {
  Purchase.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      supplierId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      products: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      comments: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 255],
        },
      },
      barcode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Purchase",
      timestamps: true,
    }
  );

  return Purchase;
};
