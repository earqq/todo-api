import { Router } from "express";
import { AuthService, EmailService, TodoService } from "../services";
import { envs } from "../../config/envs";
import { TodoController } from "./controller";




export class TodoRoutes{

    static get routes(): Router{
        const router = Router();
        const todoService = new TodoService();
        const todoController = new TodoController(todoService);

        router.post('/', todoController.store);
        router.patch('/:id', todoController.update);
        router.get('/', todoController.index);
        router.get('/:id', todoController.show);
        router.delete('/:id', todoController.delete);

        return router;

    }
}