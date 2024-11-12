import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { TodoRoutes } from "./todo/routes";
import { AuthMiddleware } from "./middlewares/auth.middleware";



export class AppRoutes{

    static get routes() :Router{
        const router = Router();
        console.log('routes');
        router.use('/api/auth', AuthRoutes.routes );
        router.use('/api/todo', AuthMiddleware.validateToken,  TodoRoutes.routes);
        return router;
    }
}