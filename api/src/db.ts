import { Sequelize } from "sequelize";
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
import StockModel from "./models/stock";
import CategoryModel from "./models/category";
import SubCategoryModel from "./models/subCategory";
import { DB_URL } from "./config";

/* ----- Utils ----- */
export const blueText = "\x1b[34m%s\x1b[0m";
export const greenText = "\x1b[32m%s\x1b[0m";

if (!DB_URL) {
  throw new Error("DB_URL must be defined");
}

const sequelize = new Sequelize(DB_URL, {
  logging: false,
  dialect: "postgres",
});

console.log(greenText, `Connecting to database with URL: ${DB_URL}`);

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
StockModel(sequelize);
CategoryModel(sequelize);
SubCategoryModel(sequelize);

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
  Stock,
  Category,
  SubCategory,
} = sequelize.models;

/* ----- Relationships Setup ----- */
// Ordenadas alfabéticamente por el nombre del modelo

Branch.hasMany(Product, { foreignKey: "branchId" });
Product.belongsTo(Branch, { foreignKey: "branchId" });

Branch.hasMany(Stock, { foreignKey: "branchId" });
Stock.belongsTo(Branch, { foreignKey: "branchId" });

Branch.hasMany(User, { foreignKey: "branchId", as: "branch" });
User.belongsTo(Branch, { foreignKey: "branchId", as: "branch" });

Company.hasMany(Branch, { foreignKey: "companyId" });
Branch.belongsTo(Company, { foreignKey: "companyId" });

Company.hasMany(Customer, { foreignKey: "companyId" });
Customer.belongsTo(Company, { foreignKey: "companyId" });

Company.hasMany(Operation, { foreignKey: "companyId" });
Operation.belongsTo(Company, { foreignKey: "companyId" });

Company.hasMany(Product, { foreignKey: "companyId" });
Product.belongsTo(Company, { foreignKey: "companyId" });

Company.hasMany(Stock, { foreignKey: "companyId" });
Stock.belongsTo(Company, { foreignKey: "companyId" });

Company.hasMany(User, { foreignKey: "companyId" });
User.belongsTo(Company, { foreignKey: "companyId" });

User.hasMany(Customer, { foreignKey: "userId" });
Customer.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Operation, { foreignKey: "userId" });
Operation.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Product, { foreignKey: "userId" });
Product.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Stock, { foreignKey: "userId" });
Stock.belongsTo(User, { foreignKey: "userId" });

Product.hasMany(Stock, { foreignKey: "productId", as: "stock" });
Stock.belongsTo(Product, { foreignKey: "productId", as: "stock" });

Category.hasMany(Product, { foreignKey: "categoryId", as: "category" });
Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

Category.hasMany(SubCategory, { foreignKey: "categoryId" });
SubCategory.belongsTo(Category, { foreignKey: "categoryId" });

SubCategory.hasMany(Product, {
  foreignKey: "subCategoryId",
  as: "subCategory",
});
Product.belongsTo(SubCategory, {
  foreignKey: "subCategoryId",
  as: "subCategory",
});

Company.hasMany(Category, { foreignKey: "companyId" });
Category.belongsTo(Company, { foreignKey: "companyId" });

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
  Stock,
  Category,
  SubCategory,
};
