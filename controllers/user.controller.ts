import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import encrypt, { hash } from 'bcryptjs';
import UserModel from '../models/user.model';
import LOG from '../utils/logging';

const NAMESPACE = 'USER';

const register = (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;
  encrypt.hash(password, 10, (hashError, hash) => {
    if (hashError) {
      return res.status(500).json({
        message: hashError.message,
        error: hashError
      });
    }
  });
  // Insert Data TO DB
  const _user = new UserModel({
    _id: new mongoose.Types.ObjectId(),
    username,
    email,
    password: hash
  });

  return _user
    .save()
    .then((user) => {
      return res.status(201).json({
        message: 'Success created user',
        data: {
          username: user.username,
          email: user.email
        }
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
        err
      });
    });
};

const me = (req: Request, res: Response, next: NextFunction) => {
  LOG.info(NAMESPACE, 'GET DATA OF ME');
  return res.status(200).json({
    message: 'GET FULL DATA OF ME'
  });
};

const ping = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: 'API ACTIVE'
  });
};

export default { me, ping, register };
