import { BcryptAdapter } from "../../config/bcrypt.adapter";
import { JWTAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data/mongo";
import { CustomError, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/register-user.dto";



export class AuthService{

    constructor(){}

    async signUp(registerUserDto: RegisterUserDto){
        
        const existingUser = await UserModel.findOne({email: registerUserDto.email});
        if(existingUser){
            throw CustomError.badRequest('User already exists');
        }
        try{
            const user = new UserModel(registerUserDto);
            user.password = BcryptAdapter.hash(registerUserDto.password);
            await user.save();

            const {password, ...rest } = UserEntity.fromObject(user.toObject());
            const token = await JWTAdapter.sign({id : user._id});
            if(!token){
                throw CustomError.internalServer('Error creating token');
            }
            return {...rest, token};

        }catch(err){
            throw CustomError.internalServer('Error creating user');
        }
        
    }

    public async loginUser(loginUserDto: LoginUserDto){
        const {email, password} = loginUserDto;
        const user = await UserModel;
        const userFound = await user.findOne({email});
        if(!userFound){
            throw CustomError.notFound('User not found');
        }
        const passwordMatch = BcryptAdapter.compare(password, userFound.password);
        if(!passwordMatch){
            throw CustomError.badRequest('Invalid password');
        }
        const {password: _, ...rest} = UserEntity.fromObject(userFound.toObject());
        const token = await JWTAdapter.sign({id: userFound.id});
        if(!token){
            throw CustomError.internalServer('Error creating token');
        }
        return {...rest, token: token};
    }
        
}