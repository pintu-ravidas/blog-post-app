import express from  'express';
const router = express.Router();
import { auth } from '../auth/auth.js';
import { Comment } from '../../models/Comment.js';
import { body } from 'express-validator';
import { Post } from '../../models/Post.js';

router.post('/api/comments/:postId/create',
    [
        body('title').notEmpty().withMessage('comment title is required!'),
    ],

    async (req, res) => {

    const { postId } = req.params;
    console.log('postId --> ', postId);
    const { title } = req.body;
    const comment =  new Comment({ title });
    await comment.save();

    const post = await Post.findById(postId);
    post.comments.push({commentId: comment.id, title: comment.title});

    //console.log('comment')
    await post.save();

    res.status(201).send({ post, comment });
});

export { router as createCommentByPostIdRouter };