import express from 'express';
import UsersController  from '../controllers/UsersController.js';
import UsersRepository from '../repositories/UsersRepository.js';
import UsersService from '../services/UsersService.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { prisma } from '../utils/prisma/index.js';
import { redisClient } from '../redis/client.js'

const router = express.Router();


const usersRepository = new UsersRepository(prisma,redisClient);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

router.post('/sign-up', (req, res, next) => usersController.signUp(req, res, next));
router.post('/sign-in', (req, res, next) => usersController.signIn(req, res, next));
router.get('/users', authMiddleware, (req, res, next) => usersController.getUser(req, res, next));


export default router;
