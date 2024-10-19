import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { validatePercentage } from "../utils/percentajeValidator";

export interface OfferInterface {
  id: string;
  products: string[];
  imageUrl?: string;
  discountPercentage: number;
  price: number;
}

export interface OfferCreationInterface
  extends Optional<OfferInterface, "id" | "imageUrl"> {}

class Offer extends Model<OfferInterface, OfferCreationInterface> {}

export default (sequelize: Sequelize) => {
  Offer.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      products: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false,
        defaultValue: [],
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      discountPercentage: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isFloat: {
            msg: "The discount should be a decimal number.",
          },
          customValidation(value: number) {
            validatePercentage(value, 0, 100, "The discount");
          },
        },
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isFloat: {
            msg: "The price should be a decimal number.",
          },
          min: {
            args: [0],
            msg: "The price should be equal or higher than 0.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Offer",
      timestamps: true,
    }
  );

  return Offer;
};
