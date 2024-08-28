require("dotenv").config();
import { Sequelize } from "sequelize";
import pg from "pg";

import ProductModel from "./models/product";
import UserModel from "./models/users";
import BranchModel from "./models/branch";
import CostumerModel from "./models/costumers";
import OfferModel from "./models/offers";
import PurchaseModel from "./models/purchases";
import OperationModel from "./models/operations";
import SupplierModel from "./models/suppliers";
import CashRegisterModel from "./models/cashRegister";

/* ----- Utils ----- */
export const blueText = "\x1b[34m%s\x1b[0m";
export const orangeText = "\x1b[33m%s\x1b[0m";

/* ----- Database connection ----- */

const { NODE_ENV, DB_URL, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

let sequelize: Sequelize;

if (NODE_ENV === "production") {
  // Production configuration
  if (!DB_URL) {
    throw new Error(
      "DB_URL is not defined in production environment variables"
    );
  }
  sequelize = new Sequelize(DB_URL, {
    logging: false,
    dialectModule: pg,
  });
  console.log(blueText, "Connected to the production database.");
} else {
  // Local configuration
  if (!DB_USER || !DB_PASSWORD || !DB_HOST) {
    throw new Error("Local environment variables is not defined");
  }
  sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/sistema_ventas`,
    {
      logging: false,
      dialectModule: pg,
    }
  );
  console.log(blueText, "Connected to the local database.");
}

/* ----- Models ----- */

ProductModel(sequelize);
UserModel(sequelize);
BranchModel(sequelize);
CostumerModel(sequelize);
OfferModel(sequelize);
PurchaseModel(sequelize);
OperationModel(sequelize);
SupplierModel(sequelize);
CashRegisterModel(sequelize);

const {
  Product,
  User,
  Branch,
  Costumer,
  Offers,
  Purchases,
  Operation,
  Suppliers,
  CashRegister,
} = sequelize.models;

Operation.hasMany(Product);

User.hasMany(Operation);
Operation.belongsTo(User);

export {
  sequelize,
  Product,
  User,
  Branch,
  Costumer,
  Offers,
  Purchases,
  Operation,
  Suppliers,
  CashRegister,
};

export const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log(blueText, "Database synced successfully.");
  } catch (error) {
    console.error("Failed to sync database:", error);
  }
};
