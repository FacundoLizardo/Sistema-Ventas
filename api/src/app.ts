import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mainRouter from "./routes";
import { greenText, syncDatabase } from "./db";
import loginRouter from "./routes/login";
import { authenticateToken } from "./utils/authenticateToken";
import cookieParser from "cookie-parser";
var session = require("express-session");
import { PORT, NODE_ENV, SESSION_SECRET } from "./config";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    },
  })
);

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/api/auth/", loginRouter);
app.use(
  "/api",
  (req, res, next) => {
    if (NODE_ENV === "production") {
      authenticateToken(req, res, next);
    } else {
      next();
    }
  },
  mainRouter
);

syncDatabase()
  .then(() => {
    app.listen(PORT || 3000, () =>
      console.log(greenText, `Server running on port ${PORT}`)
    );
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });
