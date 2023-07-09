import { Request, Response } from 'express';
import { UserTypeModel } from '../db/models/type';
import authHelper from '../helpers/auth';
import logger from '../lib/logger';
import userService from '../services/user';

/**
 * @class UserController
 */
export class UserController {
    private userService = userService;

    /**
     * @method createUser
     * @description creates a user and assigns a token
     * @param {Request} req
     * @param {Response} res
     * @returns {object} new user
     */
    static async createUser(req: Request, res: Response): Promise<void> {
        const { body }: { body: UserTypeModel } = req;

        try {
            const data = await userService.create(body);
            const { _id, email } = data;
            const token = authHelper.encode({ _id, email });

            res.status(200).json({
                success: true,
                message: 'User created successfully',
                token,
                data,
            });
        } catch (error: any) {
            logger.error(error);
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }

    /**
     * @method getAll
     * @description gets all users
     * @param {Request} req
     *  @param {Response} res
     * @returns {object} users
     * */
    static async getAll(req: Request, res: Response): Promise<void> {
        const { created = 'desc' } = req.query;
        try {
            const data = await userService.getAll({
                query: {},
                options: { sort: { created_at: created } },
            });
            res.status(200).json({
                success: true,
                message: 'Users retrieved successfully',
                data,
            });
        } catch (error: any) {
            logger.error(error);
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }
}
