import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export interface CompanyInterface {
  id: string;
  name: string;
  address?: string;
  country?: string;
  phoneNumbers?: string;
  cuit?: string;
  isActive: boolean;
}

export interface CompanyCreationInterface
  extends Optional<
    CompanyInterface,
    "id" | "address" | "phoneNumbers" | "cuit"
  > {}

class Company
  extends Model<CompanyInterface, CompanyCreationInterface>
  implements CompanyInterface
{
  public id!: string;
  public name!: string;
  public address?: string;
  public country?: string;
  public phoneNumbers?: string;
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
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phoneNumbers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
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
