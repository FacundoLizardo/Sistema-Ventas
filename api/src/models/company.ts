import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export interface CompanyInterface {
  id: string;
  name: string;
  address?: string;
  phoneNumber?: string;
  cuit?: string;
  isActive: boolean;
}

export interface CompanyCreationInterface
  extends Optional<
    CompanyInterface,
    "id" | "address" | "phoneNumber" | "cuit"
  > {}

class Company
  extends Model<CompanyInterface, CompanyCreationInterface>
  implements CompanyInterface
{
  public id!: string;
  public name!: string;
  public address?: string;
  public phoneNumber?: string;
  public cuit?: string;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Company.init(
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
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cuit: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Company",
      timestamps: true,
    }
  );

  return Company;
};
