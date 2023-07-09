import Authenticate from './auth';
import { Request } from 'express';

interface Payload {
    [key: string]: any;
}

const verifyAuthHeader = (req: Request): Payload | { error: string } => {
    try {
        if (!req.headers.authorization) {
            return { error: 'error' };
        }
        const token = req.headers.authorization.split(' ')[1];
        const payload = Authenticate.decode(token) as Payload;

        return payload;
    } catch (err) {
        return { error: 'Invalid token' };
    }
};

const validations = {
    verifyAuthHeader,
};

export default validations;
