import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts';
import authRoutes from './routes/auth';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/blog');

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

app.listen(4000, () => console.log('Server running on port 4000'));
