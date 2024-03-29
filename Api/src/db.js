require("dotenv").config();
const {Sequelize} = require("sequelize");
const pg = require("pg");

const ProductModel = require("./Models/Product.js");
const UserModel = require("./Models/Users.js");
const BranchModel = require("./Models/Branch.js");
const CostumerModel = require("./Models/Costumers.js");
const OfferModel = require("./Models/Offers.js");
const PurchaseModel = require("./Models/Purchases.js");
const OperationModel = require("./Models/Operations.js");
const SupplierModel = require("./Models/Suppliers.js");
const CashRegisterModel = require("./Models/CashRegister.js");

/* ----- Database connection ----- */

const {DB_USER, DB_PASSWORD, DB_HOST} = process.env;
const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/sistema_ventas`,
    //DBURL,
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
