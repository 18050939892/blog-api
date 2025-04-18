"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const posts_1 = __importDefault(require("./routes/posts"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*', // 在生产环境中最好使用特定的域名，而不是 '*'
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // allowedHeaders: ['Content-Type', 'Authorization','x-auth-token']
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb+srv://18050939892:deerkesi3815@blog.ssrtblo.mongodb.net/blogBatabase?retryWrites=true&w=majority&appName=blog');
app.use('/api/posts', posts_1.default);
app.use('/api/auth', auth_1.default);
app.listen(4000, () => console.log('Server running on port 4000'));
