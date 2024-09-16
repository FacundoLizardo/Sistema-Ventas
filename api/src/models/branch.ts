import { Sequelize, DataTypes, Model, Optional } from "sequelize";

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
  createdAt?: Date;
  updatedAt?: Date;
}
export interface BranchCreationInterface
  extends Optional<
    BranchInterface,
    "id" | "afipId" | "hours" | "phoneNumber"
  > {}

class Branch
  extends Model<BranchInterface, BranchCreationInterface>
  implements BranchInterface
{
  public id!: string;
  public ptoVta!: number;
  public afipId?: string;
  public name!: string;
  public location!: string;
  public isStorage?: boolean;
  public enable?: boolean;
  public manager?: string[];
  public hours?: string;
  public phoneNumber?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Branch.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      ptoVta: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      afipId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isStorage: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      enable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      manager: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false,
        defaultValue: [],
      },
      hours: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Branch",
      timestamps: true,
    }
  );

  return Branch;
};
