import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import authHelper from '../../src/helpers/auth';

afterAll(async () => {
    jest.resetAllMocks();
    return mongoose.disconnect();
});

describe('ENCODE', () => {
    it('Should encode an object with data', () => {
        const mockJwtSign = jest.spyOn(jwt, 'sign');
        mockJwtSign.mockImplementation(() => 'signedJwtToken');

        const res = authHelper.encode({ id: '1', email: 'test@mail.com' });

        expect(res).toBe('signedJwtToken');
        expect(mockJwtSign).toHaveBeenCalled();
        expect(mockJwtSign).toHaveBeenCalledTimes(1);
        expect(mockJwtSign).toHaveBeenCalledWith(
            { id: '1', email: 'test@mail.com' },
            expect.any(String),
            expect.any(Object),
        );
    });
});

describe('DECODE', () => {
    it('Should decode a token and return data', () => {
        const mockJwtVerify = jest.spyOn(jwt, 'verify');
        mockJwtVerify.mockImplementation(() => ({ id: '1', email: 'test@mail.com' }));

        const res = authHelper.decode('token');

        expect(res).toEqual({ id: '1', email: 'test@mail.com' });
        expect(mockJwtVerify).toHaveBeenCalled();
        expect(mockJwtVerify).toHaveBeenCalledTimes(1);
        expect(mockJwtVerify).toHaveBeenCalledWith('token', expect.any(String));
    });
});

describe('HASH PASSWORD', () => {
    it('Should create a hashed password from plain text', () => {
        const mockBcryptHashSync = jest.spyOn(bcrypt, 'hashSync');
        mockBcryptHashSync.mockImplementation(() => 'hashedPass');

        const res = authHelper.hashPassword('12345678');

        expect(res).toBe('hashedPass');
        expect(mockBcryptHashSync).toHaveBeenCalled();
        expect(mockBcryptHashSync).toHaveBeenCalledTimes(1);
        expect(mockBcryptHashSync).toHaveBeenCalledWith('12345678', 10);
    });
});
