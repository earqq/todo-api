import { BcryptAdapter } from "../../config/bcrypt.adapter";
import { envs } from "../../config/envs";
import { JWTAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data/mongo";
import { CustomError, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dto/login-user.dto";
import { RegisterUserDto } from "../../domain/dto/register-user.dto";
import { EmailService } from "./email.service";



export class AuthService{

    constructor(

        private readonly emailService: EmailService,

    ){}

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
            this.sendEmailValidationLink(user.email);
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

    private sendEmailValidationLink = async (email: string) => {

        const token = await JWTAdapter.sign({email});
        if(!token){
            throw CustomError.internalServer('Error creating token');
        }

        const link = `${envs.WEB_SERVICE_URL}/auth/validate-email?token=${token}`;
        const htmlBody = `<a href="${link}">Click here to validate your email</a>`;
        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody
        }
        const isSent =  this.emailService.sendEmail(options)
        if(!isSent){
            throw CustomError.internalServer('Error sending email');
        }
    }
        
    public validateEmail = async (token: string) => {
        const payload = await JWTAdapter.validateToken(token);
        if(!payload){
            throw CustomError.badRequest('Invalid token');
        }
        const {email} = payload as {email: string};
        if(!email){
            throw CustomError.badRequest('Invalid token');
        }
        const user = await UserModel.findOne({email});
        if(!user){
            throw CustomError.notFound('User not found');
        }
        user.emailIsVerified = true;
        await user.save();
    }
}