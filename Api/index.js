const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const PORT = 3001;

conn.sync().then(() => {
	server.listen(3001, () => {
		console.log(`Server listening at ${PORT}`);
	});
});
