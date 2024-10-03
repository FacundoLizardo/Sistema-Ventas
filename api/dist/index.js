"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const login_1 = __importDefault(require("./routes/login"));
const config_1 = require("./config");
const authenticateToken_1 = require("./utils/authenticateToken");
const db_1 = require("./db");
const seedDatabase_1 = __importDefault(require("./utils/seedDatabase"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
app.use("/api/auth/", login_1.default);
app.use("/api", (req, res, next) => {
    if (config_1.NODE_ENV === "production") {
        (0, authenticateToken_1.authenticateToken)(req, res, next);
    }
    else {
        next();
    }
}, routes_1.default);
(0, db_1.syncDatabase)()
    .then(async () => {
    await (0, seedDatabase_1.default)();
    app.listen(config_1.PORT || 3000, () => console.log(db_1.greenText, `Server running on port ${config_1.PORT}`));
})
    .catch((error) => {
    console.error("Failed to sync database:", error);
});
