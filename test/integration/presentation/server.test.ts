import express, { Request, Response, Router } from 'express';
import request from 'supertest';
import { Server } from '../../../src/presentation/server'; // Adjust path if necessary

describe('Server', () => {
    let server: Server;
    let router: Router;
    const port = 3000;

    beforeAll(() => {
        router = Router();
        router.get('/test', (req, res) => {res.status(200).send('Test route')});
        server = new Server({ port, router });
    });

    afterAll(() => {
        server.close();
    });

    it('should start the server and respond to requests', async () => {
        await server.start();
        
        const response = await request(server.app).get('/test');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Test route');
    });

    it('should close the server without errors', () => {
        expect(() => server.close()).not.toThrow();
    });
});