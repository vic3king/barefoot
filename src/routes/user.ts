import express from 'express';
import controllers from '../controllers';
import { verifyToken, createUserMiddleware } from '../middlewares';

const userRouter = express.Router();

const { UserController } = controllers;

userRouter.post('/', createUserMiddleware, UserController.createUser);
userRouter.get('/', verifyToken, UserController.getAll);

export default userRouter;
