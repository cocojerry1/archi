// app.js

import express from 'express';
import cookieParser from 'cookie-parser';
import UsersRouter from './routes/users.router.js';
import PostsRouter from './routes/posts.router.js';
import { redisClient } from './redis/client.js';
import "dotenv/config";




const app = express();
const PORT = 3018;

app.use(express.json());
app.use(cookieParser());
app.use('/api', [UsersRouter, PostsRouter]);



redisClient.on("connect", () => console.log("Connected to Redis!"));
redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.connect();

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});





