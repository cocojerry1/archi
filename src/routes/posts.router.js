import express from 'express';
import PostsController from '../controllers/PostsController.js';
import PostsRepository from '../repositories/PostsRepository.js';
import PostsService from '../services/PostsService.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import asyncMiddleware from '../middlewares/asyn.middleware.js';
import { prisma } from '../utils/prisma/index.js';

const router = express.Router();

const postsRepository = new PostsRepository(prisma);
const postsService = new PostsService(postsRepository);
const postsController = new PostsController(postsService);


router.post('/posts', authMiddleware, asyncMiddleware(postsController.createPost.bind(postsController)));
router.get('/posts', asyncMiddleware(postsController.getPosts.bind(postsController)));
router.get('/posts/:postId', asyncMiddleware(postsController.getPostById.bind(postsController)));
router.patch('/posts/:postId', authMiddleware, asyncMiddleware(postsController.updatePost.bind(postsController)));
router.delete('/posts/:postId', authMiddleware, asyncMiddleware(postsController.deletePost.bind(postsController)));

export default router;
