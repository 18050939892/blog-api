"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = auth;
// middleware/auth.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// 修改返回类型，确保函数不返回 Response 对象
function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        res.status(401).json({ msg: '无token，认证失败' });
        return; // 注意这里用return而不是直接返回res对象
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, 'secretKey');
        req.user = decoded.user;
        next();
    }
    catch (err) {
        res.status(401).json({ msg: 'token无效' });
    }
}
