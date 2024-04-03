require("dotenv").config();
const {Sequelize} = require("sequelize");
const pg = require("pg");

const ProductModel = require("./models/product.js");
const UserModel = require("./models/users.js");
const BranchModel = require("./models/branch.js");
const CostumerModel = require("./models/costumers.js");
const OfferModel = require("./models/offers.js");
const PurchaseModel = require("./models/purchases.js");
const OperationModel = require("./models/operations.js");
const SupplierModel = require("./models/suppliers.js");
const CashRegisterModel = require("./models/cashRegister.js");

/* ----- Database connection ----- */

const {DB_URL} = process.env;
const sequelize = new Sequelize(
    DB_URL,
    {
        logging: false,
        native: false,
        dialectModule: pg,
    }
);

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

module.exports = {
    Product,
    User,
    Branch,
    Costumer,
    Offers,
    Purchases,
    Operation,
    Suppliers,
    CashRegister,
    conn: sequelize,
};
