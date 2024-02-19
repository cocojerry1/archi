import express from 'express';
import UsersController from '../controllers/UsersController.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/sign-up', UsersController.signUp);
router.post('/sign-in', UsersController.signIn);
router.get('/users', authMiddleware, UsersController.getUser);

export default router;
