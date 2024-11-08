import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginUserDto {
    @IsEmail({}, { message: 'Email is invalid' })
    email: string;

    @IsString({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password: string;

}