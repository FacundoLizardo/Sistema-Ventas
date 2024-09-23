import { DataTypes, Sequelize } from "sequelize";
import { Model } from "sequelize";

export interface StockInterface {
  id: string;
  quantity: number;
  productId: string;
  branchId: string;
}

export interface StockCreationInterface extends Omit<StockInterface, "id"> {}

class Stock
  extends Model<StockInterface, StockCreationInterface>
  implements StockInterface
{
  public id!: string;
  public quantity!: number;
  public productId!: string;
  public branchId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Stock.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      branchId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      modelName: "Stock",
      sequelize,
    }
  );
};
