import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export interface CustomerInterface {
  id: string;
  customerType: "person" | "company";
  dni?: number;
  passport?: string;
  cuit?: number;
  cuil?: number;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  email: string;
  address?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  enableDebt?: boolean;
}

export interface CustomerCreationInterface
  extends Optional<
    CustomerInterface,
    | "id"
    | "dni"
    | "passport"
    | "cuit"
    | "cuil"
    | "companyName"
    | "firstName"
    | "lastName"
    | "address"
    | "phoneNumber"
    | "dateOfBirth"
    | "enableDebt"
  > {}

class Customer
  extends Model<CustomerInterface, CustomerCreationInterface>
  implements CustomerInterface
{
  public id!: string;
  public customerType!: "person" | "company";
  public dni?: number;
  public passport?: string;
  public cuit?: number;
  public cuil?: number;
  public firstName?: string;
  public lastName?: string;
  public companyName?: string;
  public email!: string;
  public address?: string;
  public phoneNumber?: string;
  public dateOfBirth?: Date;
  public enableDebt?: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Customer.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      customerType: {
        type: DataTypes.ENUM("person", "company"),
        allowNull: false,
      },
      dni: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isDni(value?: number) {
            if (
              value !== undefined &&
              value !== null &&
              !Number.isInteger(value)
            ) {
              throw new Error("The DNI must be an integer.");
            }
          },
        },
      },
      passport: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isPassport(value?: string) {
            const passportRegex = /^[a-zA-Z0-9]+$/;
            if (
              value !== undefined &&
              value !== null &&
              !passportRegex.test(value)
            ) {
              throw new Error("The passport format is invalid.");
            }
          },
        },
      },
      cuit: {
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          isCuit(value?: number) {
            if (value !== undefined && value !== null) {
              const cuitLength = value.toString().length;
              if (cuitLength !== 11) {
                throw new Error("The CUIT must have exactly 11 digits.");
              }
            }
          },
        },
      },
      cuil: {
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          isCuil(value?: number) {
            if (value !== undefined && value !== null) {
              const cuilLength = value.toString().length;
              if (cuilLength !== 11) {
                throw new Error("The CUIL must have exactly 11 digits.");
              }
            }
          },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 50],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 50],
        },
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 100],
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
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isValidDate(value: string) {
            if (value && isNaN(Date.parse(value))) {
              throw new Error("Date of birth is not valid.");
            }
          },
        },
      },
      enableDebt: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Customer",
      timestamps: true,
    }
  );

  return Customer;
};
