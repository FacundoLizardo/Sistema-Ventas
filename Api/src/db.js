require("dotenv").config();
const { Sequelize } = require("sequelize");
const pg = require("pg");
const ProductModel = require("./Models/Product.js");
const UserModel = require("./Models/User.js");
const BranchModel = require("./Models/Branch.js");
const CostumersModel = require("./Models/Costumers.js");
const OffersModel = require("./Models/Offers.js");
const PurchasesModel = require("./Models/Purchases.js");
const SaleModel = require("./Models/Sale.js");
const SuppliersModel = require("./Models/Suppliers.js");
const Cash_RegisterModel = require("./Models/Cash_Register.js");
const CartModel = require("./Models/Cart.js");

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
CostumersModel(sequelize);
OffersModel(sequelize);
PurchasesModel(sequelize);
SaleModel(sequelize);
SuppliersModel(sequelize);
Cash_RegisterModel(sequelize);
CartModel(sequelize);

const { Product, User, Branch, Costumers, Offers, Purchases, Sale, Suppliers, Cash_Register, Cart } = sequelize.models;

Product.belongsToMany(Cart, { through: "CartProducts" });
Cart.belongsToMany(Product, { through: "CartProducts" })


module.exports = {
	Product, User, Branch, Costumers, Offers, Purchases, Sale, Suppliers, Cash_Register, Cart,
	conn: sequelize,
};
