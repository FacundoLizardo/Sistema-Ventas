const { Router } = require("express");
const {
  getUser,
  getUsers,
  postUser,
  putUser,
  deleteUser,
} = require("../handlers/userHandler");
const {loginHandler} = require("../handlers/loginHandler");
const {confirmAccountHandler} = require("../handlers/confirmAccountHandler");


const router = Router();

router.get("/:id", getUser);
router.get("/", getUsers);
router.post("/login", loginHandler);
router.post("/", postUser);
router.post("/confirm/:token", confirmAccountHandler);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);

module.exports = router;
