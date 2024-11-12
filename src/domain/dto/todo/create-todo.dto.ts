import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateTodoDto {
    @IsString({ message: 'Title must be string' })
    @IsNotEmpty({ message: 'Title is required' })
    title: string;

    @IsString({ message: 'Description must be string' })
    @IsOptional()
    description: string;

    @IsDateString({},{ message: 'Date must be a string' })
    @IsOptional()
    date: Date;

    @IsOptional()
    isCompleted: boolean = false;
}