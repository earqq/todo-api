import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService, EmailService } from "../services";
import { envs } from "../../config/envs";




export class AuthRoutes{

    static get routes(): Router{
        const router = Router();
        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_MAIL,
            envs.MAILER_SECRET_KEY
        );
        const authService = new AuthService(emailService);
        const authController = new AuthController(authService);

        router.post('/sign-up', authController.registerUser);
        router.post('/sign-in', authController.loginUser);
        router.get('/validate-email', authController.validateEmail);

        router.post('/register', (req, res) => {
            res.send('Register');
        });

        return router;

    }
}