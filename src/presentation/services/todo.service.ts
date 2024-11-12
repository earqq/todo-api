import { TodoModel } from "../../data/mongo";
import { CustomError, UserEntity } from "../../domain";
import { CreateTodoDto } from "../../domain/dtos/todo/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todo/update-todo.dto";
import { TodoEntity } from "../../domain/entities/todo.entity";



export class TodoService{

    constructor(
    ){} 

    async index(){
        const todos = await TodoModel.find();
        const todosEntities = todos.map(todo => TodoEntity.fromObject(todo.toObject()));
        return todosEntities;
    }
    async show(id: string){
        const todo = await TodoModel.findById(id);
        if(!todo){
            throw CustomError.notFound('Todo not found');
        }
        const todoEntity = TodoEntity.fromObject(todo.toObject());
        return todoEntity;
    }

    async store(todo: CreateTodoDto){
        try{
            const newTodo = new TodoModel(todo);
            await newTodo.save();
            return newTodo;
        }catch(err){
            throw CustomError.internalServer('Error creating todo');
        }
    }

    async update(id: string, todo: UpdateTodoDto){
        try{
            const updatedTodo = await TodoModel
            .findByIdAndUpdate(id, todo
            , {new: true});
            if(!updatedTodo){
                throw CustomError.notFound('Todo not found');
            }
            return updatedTodo; 
        }catch(err){
            throw CustomError.internalServer('Error updating todo');
        }
    }

    async delete (id: string){
        try{
            const deletedTodo = await TodoModel.findByIdAndDelete(id);
            if(!deletedTodo){
                throw CustomError.notFound('Todo not found');
            }
            return deletedTodo;
        }catch(err){
            throw CustomError.internalServer('Error deleting todo');
        }
    }
        

}