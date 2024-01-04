const getUser = async (req, res) => {
	try {
		res.status(200).json("ruta get user");
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getUsers = async (req, res) => {
	try {
		res.status(200).json("ruta get users");
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const postUser = async (req, res) => {
	try {
		res.status(200).json("ruta post user");
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const putUser = async (req, res) => {
	try {
		res.status(200).json("ruta put user");
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const deleteUser = async (req, res) => {
	try {
		res.status(200).json("ruta delete user");
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = { getUser, getUsers, postUser, putUser, deleteUser };
