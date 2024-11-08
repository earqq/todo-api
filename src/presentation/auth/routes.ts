import { Router } from "express";
import { AuthService } from "../services/auth.service";
import { AuthController } from "./controller";




export class AuthRoutes{

    static get routes(): Router{
        const router = Router();
        const authService = new AuthService();
        const authController = new AuthController(authService);

        router.post('/sign-up', authController.registerUser);
        router.post('/sign-in', authController.loginUser);

        router.post('/register', (req, res) => {
            res.send('Register');
        });

        return router;

    }
}