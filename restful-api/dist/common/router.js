"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class Router {
    isValidId(id) {
        return mongoose.Types.ObjectId.isValid(id);
    }
}
exports.Router = Router;
