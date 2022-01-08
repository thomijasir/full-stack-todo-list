import express from 'express';
import authController from '../controllers/auth.controller';
import userController from '../controllers/user.controller';
import todoController from '../controllers/todo.controller';
import token from '../middleware/token';
const router = express.Router();

// Todo Router
router.get('/todos', token, todoController.getTodo);
router.post('/todo', token, todoController.createTodo);
router.patch('/todo/:id', token, todoController.updateTodo);
router.delete('/todo/:id', token, todoController.deleteTodo);

// Auth Router
router.get('/auth/validate', token, authController.validateToken);
router.post('/auth/login', authController.login);

// User Router
router.get('/user/me', userController.me);
router.get('/ping', userController.ping);
router.post('/user/register', userController.register);

export = router;
