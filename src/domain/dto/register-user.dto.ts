import { IsOptional, IsString } from "class-validator";



export class RegisterUserDto {
    @IsString() 
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string

    @IsOptional()
    @IsString()
    lastName: string;

}