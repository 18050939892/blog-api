import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts';
import authRoutes from './routes/auth';

const app = express();
app.use(cors({
    origin: '*', // 在生产环境中最好使用特定的域名，而不是 '*'
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization','x-auth-token']
}));

app.use(express.json());

mongoose.connect('mongodb+srv://18050939892:deerkesi3815@blog.ssrtblo.mongodb.net/blogBatabase?retryWrites=true&w=majority&appName=blog');

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.listen(4000, () => console.log('Server running on port 4000'));
