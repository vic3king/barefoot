import { Request, Response, NextFunction } from 'express';
import Joi from '@hapi/joi';
import joiFormatter from '../helpers/joi-formatter';
import userService from '../services/user';

const createUserValidation = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | undefined> => {
    const { body } = req;

    const schema = Joi.object({
        name: Joi.string().required(),
        phone: Joi.string(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string()
            .required()
            .pattern(/^[a-zA-Z0-9]{8,30}$/),
    });

    const { error } = schema.validate(body);

    if (error) {
        const { message } = error.details[0];
        const formattedMessage = joiFormatter(message);
        return res.status(400).send({
            success: false,
            message: formattedMessage,
        });
    }

    const user = await userService.getOne({
        query: { email: body.email },
    });

    if (user) {
        return res.status(409).send({
            success: false,
            message: 'A user with this email already exists.',
        });
    }

    next();
};

export default createUserValidation;
