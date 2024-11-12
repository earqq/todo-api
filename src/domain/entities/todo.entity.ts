import { CustomError } from "../errors/custom.error";



export class TodoEntity{

    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly date: Date,
        public readonly isCompleted: boolean = false
    ){}

    static fromObject( object: {[key: string]: any}){

        const { title, description, date, id, _id, isCompleted } = object;
        if(!id && !_id) throw CustomError.badRequest('Missing id');
        if(!title) throw CustomError.badRequest('Missing title');
        if(isCompleted === undefined) throw CustomError.badRequest('Missing isCompleted');

        return new TodoEntity(id || _id, title, description, date, isCompleted);

    }

}