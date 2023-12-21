require("dotenv").config();
const { Sequelize } = require("sequelize");
const pg = require("pg");

/* ----- Database connection ----- */

const { DB_USER, DB_PASSWORD, DB_HOST, DBURL } = process.env;
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

const ProductModel = require("./Models/Product.js");
const UserModel = require("./Models/User.js");
const BranchModel = require("./Models/Branch.js");
const CostumersModel = require("./Models/Costumers.js");
const OffersModel = require("./Models/Offers.js");
const PurchasesModel = require("./Models/Purchases.js");
const SalesModel = require("./Models/Sales.js");
const SuppliersModel = require("./Models/Suppliers.js");
const Cash_RegisterModel = require("./Models/Cash_Register.js");

ProductModel(sequelize);
UserModel(sequelize);
BranchModel(sequelize);
CostumersModel(sequelize);
OffersModel(sequelize);
PurchasesModel(sequelize);
SalesModel(sequelize);
SuppliersModel(sequelize);
Cash_RegisterModel(sequelize);

const { Product, User, Branch, Costumers, Offers, Purchases, Sales, Suppliers, Cash_Register } = sequelize.models;

module.exports = {
	Product, User, Branch, Costumers, Offers, Purchases, Sales, Suppliers, Cash_Register,
	conn: sequelize,
};
