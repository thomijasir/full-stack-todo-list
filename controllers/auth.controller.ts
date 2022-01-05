import { NextFunction, Request, Response } from 'express';
import encrypt, { hash } from 'bcryptjs';
import LOG from '../utils/logging';
import mongoose from 'mongoose';
import UserModel from '../models/user.model';
import sign from '../utils/sign';

const NAMESPACE = 'AUTH';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    LOG.info(NAMESPACE, 'Token Validate');
    return res.status(200).json({
        message: 'Authorized'
    });
};

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

export default { validateToken, register, login };
