import express from 'express';
import { postsController } from '../controllers/PostsController.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import asyncMiddleware from '../middlewares/asyn.middleware.js';

const router = express.Router();

router.post('/posts', authMiddleware, asyncMiddleware(postsController.createPost.bind(postsController)));
router.get('/posts', asyncMiddleware(postsController.getPosts.bind(postsController)));
router.get('/posts/:postId', asyncMiddleware(postsController.getPostById.bind(postsController)));
router.patch('/posts/:postId', authMiddleware, asyncMiddleware(postsController.updatePost.bind(postsController)));
router.delete('/posts/:postId', authMiddleware, asyncMiddleware(postsController.deletePost.bind(postsController)));

export default router;
