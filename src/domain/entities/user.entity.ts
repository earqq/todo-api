import { CustomError } from "../errors/custom.error";



export class UserEntity{

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly emailIsVerified: boolean = false,
        public readonly lastName?: string,
    ){}

    static fromObject( object: {[key: string]: any}){

        const { name, email, password, emailIsVerified, lastName, id, _id } = object;
        if(!id && !_id) throw CustomError.badRequest('Missing id');
        if(!name) throw CustomError.badRequest('Missing name');
        if(!email) throw CustomError.badRequest('Missing email');
        if(emailIsVerified === undefined) throw CustomError.badRequest('Missing emailValidated');
        if(!password) throw CustomError.badRequest('Missing password');


        return new UserEntity(id || _id, name, email, password, emailIsVerified, lastName );

    }

}