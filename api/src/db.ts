require("dotenv").config();
import { Sequelize } from "sequelize";
import pg from "pg";

import ProductModel from "./models/product";
import UserModel from "./models/user";
import BranchModel from "./models/branch";
import CostumerModel from "./models/costumers";
import OfferModel from "./models/offers";
import PurchaseModel from "./models/purchases";
import OperationModel from "./models/operations";
import SupplierModel from "./models/suppliers";
import CashRegisterModel from "./models/cashRegister";
import CompanyModel from "./models/company";

/* ----- Utils ----- */
export const blueText = "\x1b[34m%s\x1b[0m";
export const orangeText = "\x1b[33m%s\x1b[0m";

/* ----- Database connection ----- */

const { NODE_ENV, DB_URL, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = (() => {
  if (NODE_ENV === "production") {
    // Production configuration

    if (!DB_URL) {
      throw new Error(
        "DB_URL is not defined in production environment variables"
      );
    }
    console.log(
      blueText,
      "Connecting to the database in production environment."
    );
    return new Sequelize(DB_URL, {
      logging: false,
      dialectModule: pg,
    });
  } else if (NODE_ENV === "development") {
    // Local configuration

    if (!DB_USER || !DB_PASSWORD || !DB_HOST) {
      throw new Error("Local environment variables are not defined");
    }
    console.log(
      blueText,
      "Connecting to the database in development environment."
    );
    return new Sequelize(
      `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/gpi`,
      {
        logging: false,
        dialectModule: pg,
      }
    );
  } else {
    throw new Error("NODE_ENV is not defined or not set to a valid value");
  }
})();

export const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synced successfully.");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to sync database:", error.message);
    } else {
      console.error("Failed to sync database:", error);
    }
  }
};

/* ----- Models Initialization ----- */

ProductModel(sequelize);
UserModel(sequelize);
BranchModel(sequelize);
CostumerModel(sequelize);
OfferModel(sequelize);
PurchaseModel(sequelize);
OperationModel(sequelize);
SupplierModel(sequelize);
CashRegisterModel(sequelize);
CompanyModel(sequelize);

const {
  Product,
  User,
  Branch,
  Costumer,
  Offer,
  Purchase,
  Operation,
  Supplier,
  CashRegister,
  Company,
} = sequelize.models;

/* ----- Relationships Setup ----- */

User.belongsTo(Company, { foreignKey: "companyId" });
Company.hasMany(User, { foreignKey: "companyId" });

User.hasMany(Branch, { foreignKey: "userId" });
Branch.belongsTo(User, { foreignKey: "userId" });

export {
  sequelize,
  Product,
  User,
  Branch,
  Costumer,
  Offer,
  Purchase,
  Operation,
  Supplier,
  CashRegister,
  Company,
};
