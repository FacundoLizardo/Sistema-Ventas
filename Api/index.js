const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const PORT = process.env.PORT || 3002;

conn.sync({ force: false }).then(() => {
	server.listen(PORT, () => {
		console.log(`Server listening at ${PORT}`);
	});
});
