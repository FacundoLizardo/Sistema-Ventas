require("dotenv").config();
const { Sequelize } = require("sequelize");
const pg = require("pg");

const ProductModel = require("./Models/Product.js");
const UserModel = require("./Models/User.js");
const BranchModel = require("./Models/Branch.js");
const CostumerModel = require("./Models/Costumers.js");
const OfferModel = require("./Models/Offers.js");
const PurchaseModel = require("./Models/Purchases.js");
const OperationModel = require("./Models/Operations.js");
const SupplierModel = require("./Models/Suppliers.js");
const Cash_RegisterModel = require("./Models/Cash_Register.js");

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

ProductModel(sequelize);
UserModel(sequelize);
BranchModel(sequelize);
CostumerModel(sequelize);
OfferModel(sequelize);
PurchaseModel(sequelize);
OperationModel(sequelize);
SupplierModel(sequelize);
Cash_RegisterModel(sequelize);

const {
	Product,
	User,
	Branch,
	Costumers,
	Offers,
	Purchases,
	Operation,
	Suppliers,
	Cash_Register,
} = sequelize.models;

Product.hasMany(Operation);
Operation.hasMany(Product);

module.exports = {
	Product,
	User,
	Branch,
	Costumers,
	Offers,
	Purchases,
	Operation,
	Suppliers,
	Cash_Register,
	conn: sequelize,
};
