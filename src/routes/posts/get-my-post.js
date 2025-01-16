import express from  'express';
const router = express.Router();
import { auth } from '../auth/auth.js';
import { Post } from '../../models/Post.js';

router.get('/api/posts/mypost', auth,
    async (req, res) => {

    const posts = await Post.find({});

    res.status(200).send(posts);
});

export { router as getMyPostRouter };