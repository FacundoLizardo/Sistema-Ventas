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

/* ----- Database connection ----- */

//const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const { DB_URL } = process.env;
if (!DB_URL) {
  throw new Error("DB_URL is not defined in environment variables");
}

const sequelize = new Sequelize(DB_URL, {
  logging: false,
  dialectModule: pg,
});
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
    console.log("Database synced successfully.");
  } catch (error) {
    console.error("Failed to sync database:", error);
  }
};
