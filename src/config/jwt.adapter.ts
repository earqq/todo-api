import { envs } from "./envs";
import jwt from 'jsonwebtoken';

const JWT_SECRET = envs.JWT_SECRET;
export class JWTAdapter {

    static async sign(payload: any, duration:string = '1d'){

        return new Promise ((resolve) => {
            jwt.sign(payload, JWT_SECRET, {expiresIn: duration}, (err, token) => {
                if(err){
                    return resolve(null);
                }
                resolve(token);
            })
        })
    }

    static async validateToken<T>(token: string): Promise<T| null> {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SECRET, (err, decoded) => {
                if(err){
                    return resolve(null);
                }
                resolve(decoded as T);
            })
        })
    }
}