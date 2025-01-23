import express from 'express';
const app = express();
import cors from 'cors';
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
import cookieParser from 'cookie-parser';

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', true) // trust first proxy
app.use(bodyParser.json());



//app.use(cookieParser());

app.use(cors({
  origin: 'https://blog-post-app-client.onrender.com/',
  methods: ["GET", "POST", "PUT", "PATCH",  "DELETE"],
  credentials: true
}));



// cookie session
app.use(
  cookieSession({
    signed: false,
    secure: false,
    httpOnly: false,
  })
);

const baseUrl = process.env.BASE_URL;
app.use(currentUser);
// Register the middleware
app.use(currentUserRouter);
app.use(baseUrl, userSignupRoutes);
app.use(baseUrl, userSigninRoutes);
app.use(baseUrl, userSignoutRouter);
app.use(baseUrl, createPostRouter);
app.use(baseUrl, getAllPostRouter);
app.use(baseUrl, getMyPostRouter);
app.use(baseUrl, createCommentByPostIdRouter);
app.use(baseUrl, getCommentByPostIdRouter);

app.all('*', (req, res, next) => {
  let status = 404;
  let message = "Route not found"
   throw new Error(message, 404)
});


// handle all the throw error here
app.use((err, req, res, next) => {
  console.error('Error -> ', err);
  res.status(err.status || 500).send({
    errors: [{"msg": err.message}]
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled exception at: ', promise, 'reason: ', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.log('Uncaught exception: ', error);
  process.exit(1);
});

const shutdown = () => {
  console.log('Shutting down gracefully...');
  process.exit(1); // Exit code = 1, meaning process terminated due to an error
};

process.on('SIGTERM', shutdown); // SIGTERM -> Signal Terminated
process.on('SIGINT', shutdown); // SIGINT -> Signal Interrupted

export { app };
