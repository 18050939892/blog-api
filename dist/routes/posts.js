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
    // const posts = await Post.find({ published: true }).sort({ createdAt: -1 });
    const posts = yield Post_1.default.find();
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
router.put('/comment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, content, id } = req.body;
    const post = yield Post_1.default.findById(id);
    post === null || post === void 0 ? void 0 : post.comments.push({ user: username, content });
    yield (post === null || post === void 0 ? void 0 : post.save());
    res.status(200).json(post);
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post_1.default.findById(req.params.id);
    const { title, content } = req.body;
    if (title != null && content != null) {
        if (post != null) {
            post.title = title;
            post.content = content;
            yield post.save();
            res.status(200).json(post);
        }
        else {
            res.status(400).json({ message: "Not Found Article" });
        }
    }
    else {
        res.status(400).json({ message: "Not Found Parameter" });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Post_1.default.deleteOne({ _id: req.params.id });
    result ? res.status(200).json({ message: "文章已成功删除", result: result }) : res.status(404).json({ message: "文章未找到" });
}));
exports.default = router;
