import { CustomError } from "../../domain";
import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";
import { plainToClass } from "class-transformer";
import { CreateTodoDto } from "../../domain/dto/todo/create-todo.dto";
import { validateSync } from "class-validator";
import { UpdateTodoDto } from "../../domain/dto/todo/update-todo.dto";
import { PaginationDto } from "../../domain/dto/shared/pagination.dto";



export class TodoController {

    constructor(
        public todoService: TodoService
    ){
    }
    private handleError = (error: any, res: Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({msg: error.message});
        }
        console.error(error);
        return res.status(500).json({msg: 'Internal server error'});
    }

    index = (req: Request, res: Response): void => {

        const {page = 1, limit = 10} = req.query;

        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if(error){
            res.status(400).json({msg: error});
            return;
        }
        this.todoService.index(paginationDto!)
            .then((todos) => {
                res.json(todos);
            })
            .catch((error) => this.handleError(error, res));
    }
    show = (req: Request, res: Response): void => {
        const { id } = req.params;
        this.todoService.show(id)
            .then((todo) => {
                res.json(todo);
            })
            .catch((error) => this.handleError(error, res));
    }
    store = (req: Request, res: Response): void => {
        const createTodoDto = plainToClass(CreateTodoDto, req.body);
        const validateErrors = validateSync(createTodoDto);
        if (validateErrors.length > 0) {
            const errors = validateErrors.map(err => Object.values(err.constraints || {})).flat();
            res.status(400).json({ msg: errors });
            return;
        }

        this.todoService.store(createTodoDto)
            .then((todo) => {
                res.json(todo);
            })
            .catch((error) => this.handleError(error, res));
    }

    update = (req: Request, res: Response): void => {
        const { id } = req.params;
        const updateTodoDto = plainToClass(UpdateTodoDto, req.body);
        const validateErrors = validateSync(updateTodoDto);
        if (validateErrors.length > 0) {
            const errors = validateErrors.map(err => Object.values(err.constraints || {})).flat();
            res.status(400).json({ msg: errors });
            return;
        }

        this.todoService.update(id, updateTodoDto)
            .then((todo) => {
                res.json(todo);
            })
            .catch((error) => this.handleError(error, res));
    }

    delete = (req: Request, res: Response): void => {
        const { id } = req.params;
        this.todoService.delete(id)
            .then((todo) => {
                res.json(todo);
            })
            .catch((error) => this.handleError(error, res));
    }
}