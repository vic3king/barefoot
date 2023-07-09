import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src';
import { describe, expect, test } from '@jest/globals';

afterAll(async () => {
    jest.resetAllMocks();
    return mongoose.disconnect();
});

describe('your code', () => {
    test('it passes the tests', () => {
        expect(true).toEqual(true);
    });
});

describe('HOMEPAGE', () => {
    it('should respond with welcome message for Barefoot Nomad API', async () => {
        const response = await request(app).get('/');
        expect(response.status).toEqual(200);
    });

    it('should respond with invalid route error', async () => {
        const response = await request(app).get('/thisisaninvalidroute');
        expect(response.status).toEqual(404);
    });

    it('should respond with documentation route', async () => {
        const response = await request(app).get('/v1/doc');
        expect(response.status).toEqual(200);
    });
});
