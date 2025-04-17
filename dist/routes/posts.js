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
// routes/posts.ts
const express_1 = require("express");
const Post_1 = __importDefault(require("../models/Post"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
// 获取所有文章
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield Post_1.default.find({ published: true }).sort({ createdAt: -1 });
    res.json(posts);
}));
// 获取单篇文章
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post_1.default.findById(req.params.id);
    res.json(post);
}));
// 创建文章 (需要认证)
router.post('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = new Post_1.default(req.body);
    yield post.save();
    res.status(201).json(post);
}));
exports.default = router;
