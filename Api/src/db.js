require("dotenv").config();
const { Sequelize } = require("sequelize");
const pg = require("pg");

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

// CourseModel(sequelize);
// LessonModel(sequelize);
// PaymentModel(sequelize);
// RatingModel(sequelize);
// UserModel(sequelize);
// CategoryModel(sequelize);
//ConsumptionModel(sequelize);

const { Producto } = sequelize.models;

// //Cursos con Lecciones
// Course.hasMany(Lesson, { as: "lesson" });
// Lesson.belongsTo(Course);

// //Cursos con Ratings
// Course.hasMany(Rating, { as: "ratings" });
// //Rating.belongsTo(Course, { foreignKey: "course_id" });
// Rating.belongsTo(Course);

// User.hasMany(Rating);
// //Rating.belongsTo(User, { foreignKey: "user_id" });
// Rating.belongsTo(User);

// //Cursos con Categorias
// Category.hasMany(Course);
// Course.belongsTo(Category);

// // Courses con payments y usuarios para tener mejor la info.
// User.belongsToMany(Course, { through: "Consumption" });
// Course.belongsToMany(User, { through: "Consumption" });
// Course.belongsToMany(Payment, {
// 	through: "PaymentCourse",
// 	foreignKey: "course_id",
// });
// Payment.belongsToMany(Course, {
// 	through: "PaymentCourse",
// 	foreignKey: "payment_id",
// });

// User.hasMany(Payment);
// Payment.belongsTo(User);

module.exports = {
	Producto,
	conn: sequelize,
};
