const { Router } = require("express");
const {
  getUser,
  getUsers,
  postUser,
  putUser,
  deleteUser,
} = require("../handlers/userHandler");
const {loginHandler} = require("../handlers/loginHandler");


const router = Router();

router.get("/:id", getUser);
router.get("/", getUsers);
router.post("/login", loginHandler);
router.post("/", postUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);

module.exports = router;
