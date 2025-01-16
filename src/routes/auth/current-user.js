import express from 'express';
const router = express.Router();
import { currentUser } from './currentUser.js';

// auth middleware
router.get('/api/user/currentUser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };

