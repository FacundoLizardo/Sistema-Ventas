const { loginController } = require("../controllers/login/loginController");

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginController(email, password);
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { loginHandler };

const bcrypt = require("bcrypt");
