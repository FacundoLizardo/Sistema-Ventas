require("dotenv").config();
const { Sequelize } = require("sequelize");
const pg = require("pg");

const ProductModel = require("./Models/Product.js");

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

const { Product } = sequelize.models;

module.exports = {
	...sequelize.models,
	conn: sequelize,
};
