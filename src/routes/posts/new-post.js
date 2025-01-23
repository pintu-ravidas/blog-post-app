import express from  'express';
const router = express.Router();
import { auth } from '../auth/auth.js';
import { Post } from '../../models/Post.js';
import { body, validationResult } from 'express-validator';

router.post('/api/posts/create', auth,
    [
        body('title').notEmpty().withMessage('post title is required!'),
    ],
    async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.currentUser.userId;
    const { title } = req.body;
    const post =  new Post({ title, userId });

    await post.save();

    res.status(201).send(post);
});

export { router as createPostRouter };