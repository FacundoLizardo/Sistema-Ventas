"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.JWT_SECRET = exports.SESSION_SECRET = exports.DB_HOST = exports.DB_PASSWORD = exports.DB_USER = exports.DB_URL = exports.NODE_ENV = exports.IIBB = exports.REGIMEN_TRIBUTARIO = exports.INICIO_ACTIVIDAD = exports.DOMICILIO_FISCAL = exports.CUIT = exports.RAZON_SOCIAL = void 0;
_a = process.env, 
// Afip
exports.RAZON_SOCIAL = _a.RAZON_SOCIAL, exports.CUIT = _a.CUIT, exports.DOMICILIO_FISCAL = _a.DOMICILIO_FISCAL, exports.INICIO_ACTIVIDAD = _a.INICIO_ACTIVIDAD, exports.REGIMEN_TRIBUTARIO = _a.REGIMEN_TRIBUTARIO, exports.IIBB = _a.IIBB, 
// Database
_b = _a.NODE_ENV, 
// Database
exports.NODE_ENV = _b === void 0 ? "development" : _b, exports.DB_URL = _a.DB_URL, exports.DB_USER = _a.DB_USER, exports.DB_PASSWORD = _a.DB_PASSWORD, exports.DB_HOST = _a.DB_HOST, 
// Secret
exports.SESSION_SECRET = _a.SESSION_SECRET, exports.JWT_SECRET = _a.JWT_SECRET, 
// Other
exports.PORT = _a.PORT;
