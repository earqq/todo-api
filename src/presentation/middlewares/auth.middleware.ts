import { NextFunction, Request, Response } from "express";
import { JWTAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data/mongo";
import { UserEntity } from "../../domain";



export class AuthMiddleware{

    static async validateToken(req: Request, res: Response, next: NextFunction){
        const authorization = req.headers.authorization;
        if(!authorization){
            res.status(401).json({msg: 'Token not provided'});
            return;
        }

        if(!authorization.startsWith('Bearer')){
            res.status(401).json({msg: 'Invalid token format'});
            return;
        }

        const token = authorization.split(' ')[1];
        try{
            const payload = await JWTAdapter.validateToken<{id:string}>(token);
            if(!payload){
                res.status(401).json({msg: 'Invalid token'});
                return ;
            }
            const user = await UserModel.findById(payload.id);
            if(!user){
                res.status(404).json({msg: 'Invalid token - user not found'});
                return;
            }
            req.body.user = UserEntity.fromObject(user);
            next();
        } catch(err){
             res.status(401).json({msg: 'Invalid token'}); 
             return;
        }

    }
}