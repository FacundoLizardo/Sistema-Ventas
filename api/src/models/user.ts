import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { BranchInterface } from "./branch";

export interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address?: string;
  phoneNumber?: string;
  cuit?: string;
  branches?: BranchInterface[];
  enabled: boolean;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationInterface
  extends Optional<
    UserInterface,
    | "id"
    | "address"
    | "phoneNumber"
    | "cuit"
    | "createdAt"
    | "updatedAt"
    | "branches"
  > {}

class User
  extends Model<UserInterface, UserCreationInterface>
  implements UserInterface
{
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public address?: string;
  public phoneNumber?: string;
  public cuit?: string;
  public branches?: BranchInterface[];
  public enabled!: boolean;
  public role!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 50],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 50],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 50],
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 50],
        },
      },
      cuit: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 50],
        },
      },
      branches: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: true,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [["SUPER_ADMIN", "OWNER", "ADMIN", "BASIC"]],
            msg: "Role must be one of SUPER_ADMIN, ADMIN, DEVELOPER, BASIC",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
    }
  );

  return User;
};

/* 
    Roles: ["SUPER_ADMIN", "OWNER", "ADMIN", "BASIC"]
    SUPER_ADMIN: tiene acceso a todos los recursos
    OWNER: tiene acceso a todos los recursos MENOS al dashboard de SUPER_ADMIN
    ADMIN: tiene acceso a los recursos de usuarios y de sucursales
    BASIC: tiene acceso solo a los recursos de sucursales 
*/