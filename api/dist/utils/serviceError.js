"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceError = serviceError;
function serviceError(error) {
    const customError = error;
    const errorMessage = customError.message
        ? `Controller Error: ${customError.message}`
        : "Controller Error: An error occurred while processing the request.";
    console.error("Error details:", {
        message: customError.message,
        code: customError.code,
        stack: customError.stack,
    });
    throw new Error(errorMessage);
}
