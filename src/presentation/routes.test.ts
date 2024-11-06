import request from 'supertest';
import express from 'express';
import { AppRoutes } from '../../src/presentation/routes';

describe('AppRoutes', () => {
    let app: express.Application;

    beforeAll(() => {
        app = express();
        app.use(AppRoutes.routes);
    });

    it('should respond with "Hello World" on GET /', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello World');
    });
});