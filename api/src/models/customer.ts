import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export interface CustomerInterface {
  id: string;
  customerType: "person" | "company";
  docTipo?: string;
  docNro?: string;
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
    | "companyName"
    | "firstName"
    | "lastName"
    | "address"
    | "phoneNumber"
    | "dateOfBirth"
    | "enableDebt"
  > {}

class Customer extends Model<CustomerInterface, CustomerCreationInterface> {}

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
      docTipo: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 50],
        },
      },
      docNro: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 50],
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
