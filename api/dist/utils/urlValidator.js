"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = urlValidator;
function urlValidator(value) {
    if (value && !/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(value)) {
        throw new Error("You must provide a valid URL.");
    }
}
