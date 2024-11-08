import { Router } from "express";
import { AuthRoutes } from "./auth/routes";



export class AppRoutes{

    static get routes() :Router{
        const router = Router();
        console.log('routes');
        router.use('/api/auth', AuthRoutes.routes );
        return router;
    }
}