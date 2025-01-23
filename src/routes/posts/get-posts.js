import express from  'express';
const router = express.Router();
import { Post } from '../../models/Post.js';

router.get('/api/posts',
    async (req, res) => {

        console.log('req.currentUser get posts -> ', req.currentUser)  
    if(!req.currentUser?.userId) {
        //console.log('req.currentUser get posts -> ', req.currentUser)   
        const posts = await Post.find({});
        return res.status(200).send(posts);
    }

    let userId =  req.currentUser.userId;
    const posts = await Post.find({ userId });
    res.status(200).send(posts);

});

export { router as getAllPostRouter };
