"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategory = exports.Category = exports.Stock = exports.Company = exports.CashRegister = exports.Supplier = exports.Operation = exports.Purchase = exports.Offer = exports.Customer = exports.Branch = exports.User = exports.Product = exports.sequelize = exports.syncDatabase = exports.greenText = exports.blueText = void 0;
const sequelize_1 = require("sequelize");
const pg_1 = __importDefault(require("pg"));
const product_1 = __importDefault(require("./models/product"));
const user_1 = __importDefault(require("./models/user"));
const branch_1 = __importDefault(require("./models/branch"));
const customer_1 = __importDefault(require("./models/customer"));
const offers_1 = __importDefault(require("./models/offers"));
const purchases_1 = __importDefault(require("./models/purchases"));
const operations_1 = __importDefault(require("./models/operations"));
const suppliers_1 = __importDefault(require("./models/suppliers"));
const cashRegister_1 = __importDefault(require("./models/cashRegister"));
const company_1 = __importDefault(require("./models/company"));
const stock_1 = __importDefault(require("./models/stock"));
const category_1 = __importDefault(require("./models/category"));
const subCategory_1 = __importDefault(require("./models/subCategory"));
const config_1 = require("./config");
/* ----- Utils ----- */
exports.blueText = "\x1b[34m%s\x1b[0m";
exports.greenText = "\x1b[32m%s\x1b[0m";
if (config_1.NODE_ENV === "production" && !config_1.DB_URL) {
    throw new Error("DB_URL must be defined in production environment");
}
if (config_1.NODE_ENV === "development" && (!config_1.DB_USER || !config_1.DB_PASSWORD || !config_1.DB_HOST)) {
    throw new Error("DB_USER, DB_PASSWORD, and DB_HOST must be defined in development environment");
}
const sequelize = config_1.NODE_ENV === "production"
    ? new sequelize_1.Sequelize(config_1.DB_URL, {
        logging: false,
        dialectModule: pg_1.default,
        dialect: "postgres",
    })
    : new sequelize_1.Sequelize(`postgres://${config_1.DB_USER}:${config_1.DB_PASSWORD}@${config_1.DB_HOST}/gpi`, {
        logging: false,
        dialectModule: pg_1.default,
        dialect: "postgres",
    });
exports.sequelize = sequelize;
const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log(exports.blueText, "Database synced successfully.");
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Failed to sync database:", error.message);
        }
        else {
            console.error("Failed to sync database:", error);
        }
    }
};
exports.syncDatabase = syncDatabase;
/* ----- Models Initialization ----- */
(0, product_1.default)(sequelize);
(0, user_1.default)(sequelize);
(0, branch_1.default)(sequelize);
(0, customer_1.default)(sequelize);
(0, offers_1.default)(sequelize);
(0, purchases_1.default)(sequelize);
(0, operations_1.default)(sequelize);
(0, suppliers_1.default)(sequelize);
(0, cashRegister_1.default)(sequelize);
(0, company_1.default)(sequelize);
(0, stock_1.default)(sequelize);
(0, category_1.default)(sequelize);
(0, subCategory_1.default)(sequelize);
const { Product, User, Branch, Customer, Offer, Purchase, Operation, Supplier, CashRegister, Company, Stock, Category, SubCategory, } = sequelize.models;
exports.Product = Product;
exports.User = User;
exports.Branch = Branch;
exports.Customer = Customer;
exports.Offer = Offer;
exports.Purchase = Purchase;
exports.Operation = Operation;
exports.Supplier = Supplier;
exports.CashRegister = CashRegister;
exports.Company = Company;
exports.Stock = Stock;
exports.Category = Category;
exports.SubCategory = SubCategory;
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
SubCategory.hasMany(Product, { foreignKey: "subCategoryId", as: "subCategory" });
Product.belongsTo(SubCategory, { foreignKey: "subCategoryId", as: "subCategory" });
Company.hasMany(Category, { foreignKey: "companyId" });
Category.belongsTo(Company, { foreignKey: "companyId" });
