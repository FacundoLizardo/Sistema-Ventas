import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import mainRouter from "./routes";
import loginRouter from "./routes/login";
import { NODE_ENV, PORT } from "./config";
import { authenticateToken } from "./utils/authenticateToken";
import { yellowText, syncDatabase } from "./db";
import seedDatabase from "./utils/seedDatabase";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

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
  .then(async () => {
    await seedDatabase();
    app.listen(PORT || 3000, () =>
      console.log(yellowText, `Server running on port ${PORT}`)
    );
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });
