const { Router } = require("express");
const {
	getUser,
	getUsers,
	getUserByEmailAndPassword,
	postUser,
	putUser,
	deleteUser,
} = require("../Handlers/userHandler");

const router = Router();

router.get("/:id", getUser);
router.get("/", getUsers);
router.post("/login", getUserByEmailAndPassword);
router.post("/", postUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);

module.exports = router;
