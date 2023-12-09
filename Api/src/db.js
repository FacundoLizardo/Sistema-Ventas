require("dotenv").config();
const { Sequelize } = require("sequelize");
const pg = require("pg");

const ProductModel = require("./Models/Product.js");
const UserModel = require("./Models/User.js");
const BranchModel = require("./Models/Branch.js");
const CustomersModel = require("./Models/Customers.js");
const OffersModel = require("./Models/Offers.js");
const PurchasesModel = require("./Models/Purchases.js");
const SalesModel = require("./Models/Sales.js");
const SuppliersModel = require("./Models/Suppliers.js");

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

ProductModel(sequelize);
UserModel(sequelize);
BranchModel(sequelize);
CustomersModel(sequelize);
OffersModel(sequelize);
PurchasesModel(sequelize);
SalesModel(sequelize);
SuppliersModel(sequelize);

const { Product, User, Branch, Customers, Offers, Purchases, Sales, Suppliers } = sequelize.models;

module.exports = {
	...sequelize.models,
	conn: sequelize,
};
