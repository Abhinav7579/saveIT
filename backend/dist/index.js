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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const zod_1 = __importDefault(require("zod"));
const util_1 = require("./util");
const middleware_1 = require("./middleware");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("./config");
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredbody = zod_1.default.object({
        username: zod_1.default.string().min(3, { message: "Username must be at least 3 characters" }).max(10, { message: "Username must be at most 10 characters" }),
        password: zod_1.default.string().min(4, { message: "Password must be at least 4 characters" }).max(10, { message: "Password must be at most 10 characters" })
    });
    const safeparse = requiredbody.safeParse(req.body);
    // if(!safeparse.success){
    //     res.status(400).json({
    //         message:"error in input"
    //     })
    //     return;
    // }
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
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield db_1.userModel.findOne({ username });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, config_1.JWT_PASS);
        res.json({ token: token });
    }
    else {
        res.status(403).json({ message: "Incorrect credentials" });
    }
}));
app.post("/api/v1/content", middleware_1.middleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const type = req.body.type;
    const link = req.body.link;
    try {
        yield db_1.contentModel.create({
            title: title,
            type: type,
            link: link,
            tags: [],
            userId: req.id
        });
        res.json({
            mesasge: "content added"
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Error adding content",
        });
    }
}));
app.get("/api/v1/content", middleware_1.middleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Contentid = req.id;
    if (!Contentid) {
        res.status(400).json({ message: "User ID not found in request" });
        return;
    }
    try {
        const FindContent = yield db_1.contentModel.find({ userId: Contentid }).populate("userId");
        if (FindContent.length > 0) {
            res.json({ FindContent });
        }
        else {
            res.status(404).json({ message: "Content not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
app.delete("/api/v1/content/:id", middleware_1.middleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.params.id;
    const userId = req.id;
    const content = yield db_1.contentModel.findOne({
        _id: contentId,
        userId: userId,
    });
    if (!content) {
        res.status(404).json({ message: "Content not found or unauthorized" });
        return;
    }
    yield db_1.contentModel.deleteOne({ _id: contentId });
    res.json({
        message: "Successfully deleted",
    });
}));
app.post("/api/v1/brain/share", middleware_1.middleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.linkmodel.findOne({
            userId: req.id
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, util_1.random)(10);
        yield db_1.linkmodel.create({
            userId: req.id,
            hash: hash
        });
        res.json({
            hash
        });
    }
    else {
        yield db_1.linkmodel.deleteOne({
            userId: req.id
        });
    }
}));
app.get("/api/v1/brain/:sharedlink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.sharedlink;
    const link = yield db_1.linkmodel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "sorry not able to find"
        });
        return;
    }
    const content = yield db_1.contentModel.find({
        userId: link.userId
    });
    const user = yield db_1.userModel.findById({
        _id: link.userId
    });
    res.json({
        username: user === null || user === void 0 ? void 0 : user.username,
        content: content
    });
}));
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
