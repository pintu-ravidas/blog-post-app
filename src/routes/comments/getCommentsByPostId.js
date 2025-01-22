import express from  'express';
const router = express.Router();
import { auth } from '../auth/auth.js';
import { Comment } from '../../models/Comment.js';
import { body } from 'express-validator';
import { Post } from '../../models/Post.js';


router.get('/api/comments/:postId', auth,

    async (req, res) => {

    const { postId } = req.params;

    const post = await Post.findById(postId);

    res.status(200).send(post.comments);
});

export { router as getCommentByPostIdRouter };