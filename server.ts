// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import postRoutes from './routes/posts';
// import authRoutes from './routes/auth';
//
// const app = express();
// app.use(cors({
//     origin: '*', // 在生产环境中最好使用特定的域名，而不是 '*'
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     // allowedHeaders: ['Content-Type', 'Authorization','x-auth-token']
//     allowedHeaders: ['Content-Type', 'Authorization','x-auth-token']
// }));
//
// app.use(express.json());
//
// mongoose.connect('mongodb+srv://18050939892:deerkesi3815@blog.ssrtblo.mongodb.net/blogBatabase?retryWrites=true&w=majority&appName=blog');
//
// app.use('/api/posts', postRoutes);
// app.use('/api/auth', authRoutes);
// app.listen(4000, () => console.log('Server running on port 4000'));

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts';
import authRoutes from './routes/auth';

const app = express();


// 配置 CORS
app.use(cors({
    origin: function(origin, callback) {
            callback(null, true);
    },
    credentials: true, // 允许携带凭证（cookies等）
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token', 'Origin', 'Accept'],
    exposedHeaders: ['Content-Length', 'x-auth-token'],
    maxAge: 86400 // 预检请求缓存时间（24小时）
}));

// 特殊处理 OPTIONS 请求
app.options('*', (req, res) => {
    res.status(204).end();
});

// 请求日志中间件（有助于调试）
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url} from origin: ${req.headers.origin || 'unknown'}`);
    next();
});

// 正常的请求处理
app.use(express.json());

mongoose.connect('mongodb+srv://18050939892:deerkesi3815@blog.ssrtblo.mongodb.net/blogBatabase?retryWrites=true&w=majority&appName=blog')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// 测试端点以验证 CORS
app.get('/api/cors-test', (req, res) => {
    res.json({
        success: true,
        message: 'CORS is working correctly',
        requestOrigin: req.headers.origin || 'no origin',
        timestamp: new Date().toISOString()
    });
});

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

// 获取端口配置（兼容 Railway 等云平台）
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
