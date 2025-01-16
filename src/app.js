import express from 'express';
const app = express();
import { userSignupRoutes } from './routes/auth/signup.js';
import { userSigninRoutes } from './routes/auth/signin.js';
import { userSignoutRouter } from './routes/auth/signout.js';
import { currentUserRouter } from './routes/auth/current-user.js';
import { createPostRouter } from './routes/posts/new-post.js';
import { currentUser } from './routes/auth/currentUser.js';
import { getAllPostRouter } from './routes/posts/get-posts.js';
import { getMyPostRouter } from './routes/posts/get-my-post.js';
import { createCommentByPostIdRouter } from './routes/comments/createCommentByPostId.js';
import { getCommentByPostIdRouter } from './routes/comments/getCommentsByPostId.js';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cookie session
app.use(
  cookieSession({
    signed: false,
    secure: false
  })
);

app.use(currentUser);
// Register the middleware
app.use(currentUserRouter);
app.use(userSignupRoutes);
app.use(userSigninRoutes);
app.use(userSignoutRouter);
app.use(createPostRouter);
app.use(getAllPostRouter);
app.use(getMyPostRouter);
app.use(createCommentByPostIdRouter);
app.use(getCommentByPostIdRouter);

export { app };