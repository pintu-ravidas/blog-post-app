import express from  'express';
const router = express.Router();
import { auth } from '../auth/auth.js';
import { Post } from '../../models/Post.js';
import { body } from 'express-validator';

//app.use(currentUserRouter);

router.post('/api/posts/create',
    [
        body('email').notEmpty().withMessage('Title is required!'),
    ],
    async (req, res) => {

    const { title } = req.body;
    const post =  new Post({ title });

    await post.save();

    res.status(201).send(post);
});

export { router as createPostRouter };