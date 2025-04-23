// routes/posts.ts
import { Router } from 'express';
import Post from '../models/Post';
import auth from '../middleware/auth';

const router = Router();

// 获取所有文章
router.get('/', async (req, res) => {
    // const posts = await Post.find({ published: true }).sort({ createdAt: -1 });
    const posts=await Post.find()
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

router.put('/comment', async (req, res) => {
    const {username, content, id} = req.body
    const post = await Post.findById(id)
    post?.comments.push({user:username,content})
    await post?.save();
    res.status(200).json(post)
});

router.put('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    const {title, content} = req.body
    if(title!=null && content!=null){
        if(post!=null){
            post.title=title;
            post.content=content;
            await post.save();
            res.status(200).json(post);
        }else{
            res.status(400).json({message:"Not Found Article"});
        }

    }else{
        res.status(400).json({message:"Not Found Parameter"});
    }

});
router.delete('/:id', async (req, res) => {
    const result = await Post.deleteOne({ _id: req.params.id });
    result?res.status(200).json({ message: "文章已成功删除", result: result }) : res.status(404).json({ message: "文章未找到" });
    
    
});

export default router;
