import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import TodoModel from '../models/todo.model';
import LOG from '../utils/logging';

const NAMESPACE = 'TODO';

const getTodo = (req: Request, res: Response, next: NextFunction) => {
  const username = res.locals.jwt?.username;
  TodoModel.find({ username })
    .exec()
    .then((todos) => {
      return res.status(200).json({
        message: 'Get list todo',
        data: {
          todos,
          count: todos.length
        }
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
};

const createTodo = (req: Request, res: Response, next: NextFunction) => {
  const { title } = req.body;
  const newTodo = new TodoModel({
    _id: new mongoose.Types.ObjectId(),
    username: res.locals.jwt?.username,
    title,
    done: false
  });
  return newTodo
    .save()
    .then((todo) => {
      return res.status(201).json({
        message: 'Success created todo',
        todo
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
        err
      });
    });
};

const updateTodo = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.id;
  const { title, done } = req.body;
  TodoModel.update({ _id }, { $set: { done } })
    .exec()
    .then(() => {
      return res.status(200).json({
        message: `Update Data: ${_id}`,
        data: {
          title,
          done
        }
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
};

const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.id;
  TodoModel.remove({ _id })
    .exec()
    .then(() => {
      return res.status(200).json({
        message: 'Success Remove Todo'
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
};
export default { createTodo, getTodo, updateTodo, deleteTodo };
