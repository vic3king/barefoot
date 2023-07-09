import { Request as ExpressRequest, Response, NextFunction } from 'express';
import validations from '../helpers/validations';

interface Request extends ExpressRequest {
    user?: any;
}

/**
 * @method verifyToken
 * @description Verifies the token provided by the user
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {*} - JSON response object
 */
const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
    const payload = validations.verifyAuthHeader(req);

    let error: string | undefined;
    let status: number | undefined;
    if (!payload || payload.error === 'error') {
        status = 401;
        error = 'You are not authorized';
    }
    if (payload.error === 'Invalid token') {
        status = 403;
        error = 'Forbidden';
    }

    if (error) {
        return res.status(status!).json({
            success: false,
            message: error,
        });
    }
    req.user = payload;
    return next();
};

export default verifyToken;
