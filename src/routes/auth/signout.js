import express from 'express';
const router = express.Router();
import { auth } from './auth.js';

router.post('/api/user/signout', auth, (req, res) => {
     req.session = null;
     res.send({});
});

export { router as userSignoutRouter };