import { Sequelize } from "sequelize";
import pg from "pg";
import ProductModel from "./models/product";
import UserModel from "./models/user";
import BranchModel from "./models/branch";
import CustomerModel from "./models/customer";
import OfferModel from "./models/offers";
import PurchaseModel from "./models/purchases";
import OperationModel from "./models/operations";
import SupplierModel from "./models/suppliers";
import CashRegisterModel from "./models/cashRegister";
import CompanyModel from "./models/company";
import { NODE_ENV, DB_URL, DB_USER, DB_PASSWORD, DB_HOST } from "./config";

/* ----- Utils ----- */
export const blueText = "\x1b[34m%s\x1b[0m";
export const orangeText = "\x1b[33m%s\x1b[0m";

if (NODE_ENV === "production" && !DB_URL) {
  throw new Error("DB_URL must be defined in production environment");
}
if (NODE_ENV === "development" && (!DB_USER || !DB_PASSWORD || !DB_HOST)) {
  throw new Error(
    "DB_USER, DB_PASSWORD, and DB_HOST must be defined in development environment"
  );
}

const sequelize =
  NODE_ENV === "production"
    ? new Sequelize(DB_URL!, {
        logging: false,
        dialectModule: pg,
        dialect: "postgres",
      })
    : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/gpi`, {
        logging: false,
        dialectModule: pg,
        dialect: "postgres",
      });

export const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log(blueText, "Database synced successfully.");
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
CustomerModel(sequelize);
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
  Customer,
  Offer,
  Purchase,
  Operation,
  Supplier,
  CashRegister,
  Company,
} = sequelize.models;

/* ----- Relationships Setup ----- */

User.hasMany(Branch, { foreignKey: "userId" });
Branch.belongsTo(User, { foreignKey: "userId" });

Operation.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Operation, { foreignKey: "userId" });

Company.hasMany(User, { foreignKey: "companyId" });
User.belongsTo(Company, { foreignKey: "companyId" });

Company.hasMany(Operation, { foreignKey: "companyId" });
Operation.belongsTo(Company, { foreignKey: "companyId" });

Company.hasMany(Product, { foreignKey: "companyId" });
Product.belongsTo(Company, { foreignKey: "companyId" });

Company.hasMany(Customer, { foreignKey: "companyId" });
Customer.belongsTo(Company, { foreignKey: "companyId" });

export {
  sequelize,
  Product,
  User,
  Branch,
  Customer,
  Offer,
  Purchase,
  Operation,
  Supplier,
  CashRegister,
  Company,
};
