"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePercentage = validatePercentage;
function validatePercentage(value, min, max, fieldName) {
    if (value < min) {
        throw new Error(`${fieldName} should be greater than or equal to ${min}.`);
    }
    else if (value > max) {
        throw new Error(`${fieldName} should be less than or equal to ${max}.`);
    }
}
