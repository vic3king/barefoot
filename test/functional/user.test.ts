import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../src/';
import User from '../../src/db/models/user';

const baseUrl = '/v1';

beforeAll(async () => {
    await User.create({
        email: 'random@email.com',
        name: 'mock',
        password: '12345678abc',
        phone: '1234567890',
    });
});

afterAll(async () => {
    jest.resetAllMocks();
    await User.deleteMany({});
    return mongoose.disconnect();
});

describe('CREATE USER', () => {
    it('Should create a new user', async () => {
        const res = await request(app)
            .post(`${baseUrl}/users`)
            .send({ email: 'test@user.com', name: 'mock', password: '12345678abc' });

        const { success, token, message } = res.body;

        expect(res.statusCode).toEqual(200);
        expect(success).toBe(true);
        expect(token).toBeTruthy();
        expect(message).toEqual('User created successfully');
    });

    it('Should not create user if email already exists', async () => {
        const res = await request(app)
            .post(`${baseUrl}/users`)
            .send({ email: 'random@email.com', name: 'mock', password: '1234abCD' });

        const { success, message } = res.body;
        expect(res.statusCode).toEqual(409);
        expect(success).toBe(false);
        expect(message).toEqual('A user with this email already exists.');
    });

    it('Should fail if password does not meet pattern', async () => {
        const res = await request(app)
            .post(`${baseUrl}/users`)
            .send({ email: 'mock@email.com', name: 'mock', password: '123456' });

        const { success, message } = res.body;
        expect(res.statusCode).toEqual(400);
        expect(success).toBe(false);

        expect(message).toEqual(
            'password with value 123456 fails to match the required pattern: /^[a-zA-Z0-9]{8,30}$/',
        );
    });

    it('Should fail if email is not provided', async () => {
        const res = await request(app)
            .post(`${baseUrl}/users`)
            .send({ name: 'mock', password: '123456' });

        const { success, message } = res.body;
        expect(res.statusCode).toEqual(400);
        expect(success).toBe(false);
        expect(message).toEqual('email is required');
    });

    it('Should fail if password is not provided', async () => {
        const res = await request(app)
            .post(`${baseUrl}/users`)
            .send({ email: 'mock@email.com', name: 'mock' });

        const { success, message } = res.body;
        expect(res.statusCode).toEqual(400);
        expect(success).toBe(false);
        expect(message).toEqual('password is required');
    });

    it('Should fail if name is not provided', async () => {
        const res = await request(app)
            .post(`${baseUrl}/users`)
            .send({ email: 'mock@email.com', password: '123456' });

        const { success, message } = res.body;
        expect(res.statusCode).toEqual(400);
        expect(success).toBe(false);
        expect(message).toEqual('name is required');
    });
});

describe('GET ALL USERS', () => {
    it('Should fail if token is not provided', async () => {
        const res = await request(app).get(`${baseUrl}/users`);

        const { success, message } = res.body;

        expect(res.statusCode).toEqual(401);
        expect(success).toBe(false);
        expect(message).toEqual('You are not authorized');
    });

    it('Should fail if invalid token is  provided', async () => {
        const res = await request(app)
            .get(`${baseUrl}/users`)
            .set('authorization', `Bearer ${'invalid token'}`);

        const { success, message } = res.body;

        expect(res.statusCode).toEqual(403);
        expect(success).toBe(false);
        expect(message).toEqual('Forbidden');
    });

    it('Should get all users', async () => {
        const {
            body: { token },
        } = await request(app)
            .post(`${baseUrl}/users`)
            .send({ email: 'access@user.com', name: 'mock', password: '12345678abc' });

        const res = await request(app)
            .get(`${baseUrl}/users`)
            .set('authorization', `Bearer ${token}`);

        const { success, message, data } = res.body;

        expect(res.statusCode).toEqual(200);
        expect(success).toBe(true);
        expect(data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    email: 'random@email.com',
                    name: 'mock',
                    isAdmin: false,
                    phone: '1234567890',
                }),
                expect.objectContaining({
                    email: 'test@user.com',
                    name: 'mock',
                    isAdmin: false,
                }),
            ]),
        );
        expect(message).toEqual('Users retrieved successfully');
    });
    it('Should get all users and sort by created date', async () => {
        const {
            body: { token },
        } = await request(app)
            .post(`${baseUrl}/users`)
            .send({ email: 'testing@user.com', name: 'mock', password: '12345678abc' });

        const res = await request(app)
            .get(`${baseUrl}/users?created=asc`)
            .set('authorization', `Bearer ${token}`);

        const { success, message, data } = res.body;

        expect(res.statusCode).toEqual(200);
        expect(success).toBe(true);
        expect(message).toEqual('Users retrieved successfully');

        const isSorted = data.every((user: { created_at: number }, index: number) => {
            if (index === 0) return true;
            const prevUser = data[index - 1];
            return user.created_at >= prevUser.created_at;
        });

        expect(isSorted).toBe(true);
    });
});
