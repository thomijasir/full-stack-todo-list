import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import CONFIG from '../configs';
import LOG from '../utils/logging';

const NAMESPACE = 'MIDDLEWARE_TOKEN';

export default (req: Request, res: Response, next: NextFunction) => {
    LOG.info(NAMESPACE, 'Middleware Validation');
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        jwt.verify(token, CONFIG.server.token.secret, (error, decode) => {
            if (error) {
                return res.status(404).json({
                    message: error.message,
                    error
                });
            } else {
                res.locals.jwt = decode;
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: 'Access denied!'
        });
    }
};
