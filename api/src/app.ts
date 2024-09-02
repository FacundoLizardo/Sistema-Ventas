import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mainRouter from "./routes";
import { orangeText, syncDatabase } from "./db";
import loginRouter from "./routes/login";
import { authenticateToken } from "./utils/authenticateToken";

const PORT = process.env.PORT || 3000;
const app = express();
const NODE_ENV = process.env.NODE_ENV || "development";

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

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

app.use("/login", loginRouter);
if (NODE_ENV === "production") app.use("/", authenticateToken ,mainRouter);
if (NODE_ENV === "development") app.use("/", mainRouter);

syncDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log(orangeText, `Server running on port ${PORT}`)
    );
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });
