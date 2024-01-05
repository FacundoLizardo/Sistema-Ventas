const getUserByIdController = require("../Controllers/user/getUserController");
const postUserController = require("../Controllers/user/postUserController");
const putUserController = require("../Controllers/user/putUserController");
const getAllUsersController = require("../Controllers/user/getAllUsersController");
const deleteUserController = require("../Controllers/user/deleteUserController");
const getUser = async (req, res) => {
	const id = req.params;
	try {
		const user = await getUserByIdController(id);
		user
			? res.status(200).json({ success: true, user })
			: res.status(400).json({ success: false, message: "User not found" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getUsers = async (req, res) => {
	try {
		const products = await getAllUsersController();
		products
			? res.status(200).json({ success: true, products })
			: res.status(404).json({ success: false, message: "No products found." });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const postUser = async (req, res) => {
	const {
		firstName,
		lastName,
		email,
		address,
		phoneNumber,
		cuit,
		branch,
		enabled,
		role,
	} = req.body;

	if (!firstName || !lastName || !email || !enabled || !role) {
		return res.status(400).json({ message: "Missing information" });
	}
	try {
		const newUser = await postUserController(
			firstName,
			lastName,
			email,
			address,
			phoneNumber,
			cuit,
			branch,
			enabled,
			role
		);
		return res.status(200).json(newUser);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const putUser = async (req, res) => {
	try {
		const cuit = req.params.id;
		const {
			firstName,
			lastName,
			email,
			address,
			phoneNumber,
			branch,
			enabled,
			role,
		} = req.body;

		const updateUser = await putUserController(
			firstName,
			lastName,
			email,
			address,
			phoneNumber,
			cuit,
			branch,
			enabled,
			role
		);
		res.status(200).json(updateUser);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const deleteUser = async (req, res) => {
	try {
		const cuit = req.params.id;
		const deletedUser = await deleteUserController(cuit);
		res.status(200).json(deletedUser);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = { getUser, getUsers, postUser, putUser, deleteUser };
