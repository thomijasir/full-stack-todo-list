import { NextFunction, Request, Response } from 'express';
import encrypt from 'bcryptjs';
import LOG from '../utils/logging';
import UserModel from '../models/user.model';
import sign from '../utils/sign';

const NAMESPACE = 'AUTH';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  LOG.info(NAMESPACE, 'Token Validate');
  return res.status(200).json({
    message: 'Authorized'
  });
};

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  // Find Data From DB
  UserModel.find({ email })
    .exec()
    .then((users) => {
      if (users.length !== 1) {
        return res.status(401).json({
          message: 'Unauthorize'
        });
      }
      encrypt.compare(password, users[0].password, (error, result) => {
        if (error) {
          LOG.error(NAMESPACE, error.message, error);
          return res.status(401).json({
            message: 'Unauthorize'
          });
        }
        sign(users[0], (_error, token) => {
          if (_error) {
            LOG.error(NAMESPACE, _error.message, _error);
            return res.status(401).json({
              message: 'Unauthorize'
            });
          }
          return res.status(200).json({
            message: 'Auth Success',
            token,
            user: users[0].username
          });
        });
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
};

export default { validateToken, login };
