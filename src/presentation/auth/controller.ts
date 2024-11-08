import { plainToClass } from "class-transformer";
import { RegisterUserDto } from "../../domain/dtos/register-user.dto";
import { AuthService } from "../services/auth.service";
import { validateSync } from "class-validator";
import { CustomError } from "../../domain";
import { Request, Response } from "express";
import { LoginUserDto } from "../../domain/dtos/login-user.dto";



export class AuthController {

    constructor(
        public authService: AuthService
    ){
    }
    private handleError = (error: any, res: Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({msg: error.message});
        }
        console.error(error);
        return res.status(500).json({msg: 'Internal server error'});
    }

    registerUser = (req: Request, res: Response) => {
        const registerUserDto = plainToClass(RegisterUserDto, req.body);
        const validationErrors = validateSync(registerUserDto);
        if (validationErrors.length > 0) {
            const errors = validationErrors.map(err => Object.values(err.constraints || {})).flat();
            return res.status(400).json({ msg: errors });
        }
        this.authService.signUp(registerUserDto!)
        .then((user) => {res.json(user)})
        .catch((error) => this.handleError(error, res));
        
    }

    loginUser = (req: Request, res: Response) => {
        const loginUserDto = plainToClass(LoginUserDto, req.body);
        const err = validateSync(loginUserDto);
        if (err.length > 0) {
            const errors = err.map(err => Object.values(err.constraints || {})).flat();
            return res.status(400).json({msg: errors});
        }
        this.authService.loginUser(loginUserDto!)
        .then((user) => {
            res.json(user)
        })
        .catch((error) => this.handleError(error, res));
    }

}