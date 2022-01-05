import express from 'express';
import authController from '../controllers/auth.controller';
import userController from '../controllers/user.controller';
import token from '../middleware/token';
const router = express.Router();

router.get('/auth/validate', token, authController.validateToken);
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/me', userController.me);
router.get('/ping', userController.ping);

export = router;
