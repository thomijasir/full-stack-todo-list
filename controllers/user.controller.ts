import { NextFunction, Request, Response } from 'express';
import LOG from '../utils/logging';

const NAMESPACE = 'USER';

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

export default { me, ping };
