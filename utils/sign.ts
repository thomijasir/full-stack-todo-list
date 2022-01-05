import jwt from 'jsonwebtoken';
import CONFIG from '../configs';
import LOG from './logging';
import { IUser } from '../interfaces/user.interfaces';

const NAMESPACE = 'SIGN';

type CallBackSign = (error: Error | null, token: string | null) => void;

export default (user: IUser, callback: CallBackSign): void => {
    LOG.info(NAMESPACE, `Attempting to sign token for ${user.username}`);

    const timeSign = new Date().getTime();
    const timeExpire = timeSign + Number(CONFIG.server.token.expireTime) * 10000;
    const expireTimeInSeconds = Math.floor(timeExpire / 1000);
    try {
        jwt.sign(
            {
                username: user.username
            },
            CONFIG.server.token.secret,
            {
                issuer: CONFIG.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: expireTimeInSeconds
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                } else {
                    throw 'SOMETHING WRONG';
                }
            }
        );
    } catch (err: any) {
        LOG.error(NAMESPACE, err.message, err);
        callback(err, null);
    }
};
