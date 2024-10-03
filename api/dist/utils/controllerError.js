"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerError = void 0;
const controllerError = (res, error, statusCode = 500) => {
    const errorMessage = error instanceof Error
        ? error.message
        : "An unknown error occurred.";
    res.status(statusCode).json({
        success: false,
        message: errorMessage,
    });
};
exports.controllerError = controllerError;
