"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const zod_1 = __importDefault(require("zod"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const bcrypt_1 = __importDefault(require("bcrypt"));
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredbody = zod_1.default.object({
        username: zod_1.default.string().min(3, { message: "Username must be at least 3 characters" }).max(10, { message: "Username must be at most 10 characters" }),
        password: zod_1.default.string().min(4, { message: "Password must be at least 4 characters" }).max(10, { message: "Password must be at most 10 characters" })
    });
    const safeparse = requiredbody.safeParse(req.body);
    if (!safeparse.success) {
        res.status(400).json({
            message: "error in input"
        });
        return;
    }
    const username = req.body.username;
    const password = req.body.password;
    const hashpassword = yield bcrypt_1.default.hash(password, 5);
    try {
        yield db_1.userModel.create({
            username: username,
            password: hashpassword
        });
        res.status(200).json({
            message: "you are successfully signed up"
        });
    }
    catch (e) {
        res.status(411).json({
            message: "user already exist"
        });
    }
}));
