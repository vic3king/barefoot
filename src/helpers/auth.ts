import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';

dotenv.config();

interface DataObject {
    [key: string]: any;
}

const authHelper = {
    /**
     * @method encode
     * @description
     * @param {DataObject} data to be encoded
     * @returns {string} encoded user token
     */
    encode: (data: DataObject): string => {
        const secret: Secret = process.env.SECRETKEY as Secret;
        const token: string = jwt.sign(data, secret, { expiresIn: '72h' });
        return token;
    },

    /**
     * @method hashPassword
     * @description hashes a user's password
     * @param {string} password to be hashed
     * @returns {string} hashed password
     */
    hashPassword: (password: string): string => {
        return bcrypt.hashSync(password, 10);
    },

    /**
     * @method decode
     * @description
     * @param {string} token to be decoded
     * @returns {DataObject} decoded user token
     */
    decode: (token: string): DataObject => {
        const isVerified: DataObject = jwt.verify(
            token,
            process.env.SECRETKEY as Secret,
        ) as DataObject;
        return isVerified;
    },
};

export default authHelper;
