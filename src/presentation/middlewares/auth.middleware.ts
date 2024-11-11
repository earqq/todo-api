import { NextFunction, Request, Response } from "express";
import { JWTAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data/mongo";
import { UserEntity } from "../../domain";



export class AuthMiddleware{

    static async validateToken(req: Request, res: Response, next: NextFunction){
        const authorization = req.headers.authorization;
        if(!authorization){
            return res.status(401).json({msg: 'Token not provided'});
        }

        if(!authorization.startsWith('Bearer')){
            return res.status(401).json({msg: 'Invalid token format'});
        }

        const token = authorization.split(' ')[1];
        try{
            const payload = await JWTAdapter.validateToken<{id:string}>(token);
            if(!payload){
                return res.status(401).json({msg: 'Invalid token'});
            }
            const user = await UserModel.findById(payload.id);
            if(!user){
                return res.status(404).json({msg: 'Invalid token - user not found'});
            }
            req.body.user = UserEntity.fromObject(user);
            next();
        } catch(err){
            return res.status(401).json({msg: 'Invalid token'});
        }

    }
}