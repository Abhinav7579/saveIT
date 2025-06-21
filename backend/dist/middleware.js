"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleWare = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const middleWare = (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header) {
        res.status(401).json({
            message: "Authorization token is missing"
        });
        return;
    }
    const token = header.split(" ")[1];
    if (!token) {
        res.status(401).json({
            message: "Authorization token format is incorrect"
        });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_PASS);
        req.id = decoded.id;
        next();
    }
    catch (error) {
        res.status(400).json({
            message: "Invalid or expired token"
        });
        return;
    }
};
exports.middleWare = middleWare;
