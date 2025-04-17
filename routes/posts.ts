// routes/posts.ts
import { Router } from 'express';
import Post from '../models/Post';
import auth from '../middleware/auth';

const router = Router();

// 获取所有文章
router.get('/', async (req, res) => {
    const posts = await Post.find({ published: true }).sort({ createdAt: -1 });
    res.json(posts);
});

// 获取单篇文章
router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.json(post);
});

// 创建文章 (需要认证)
router.post('/', auth, async (req, res) => {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
});

export default router;
