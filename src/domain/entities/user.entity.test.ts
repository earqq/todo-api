import { CustomError, UserEntity } from '../index';

describe('UserEntity.fromObject', () => {
    it('should create a UserEntity instance when all required fields are provided', () => {
        const data = {
            id: '123',
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            emailIsVerified: true,
            lastName: 'Doe'
        };

        const user = UserEntity.fromObject(data);

        expect(user).toBeInstanceOf(UserEntity);
        expect(user.id).toBe('123');
        expect(user.name).toBe('John Doe');
        expect(user.email).toBe('johndoe@example.com');
        expect(user.password).toBe('password123');
        expect(user.emailIsVerified).toBe(true);
        expect(user.lastName).toBe('Doe');
    });

    it('should throw a CustomError when id is missing', () => {
        const data = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            emailIsVerified: true,
            lastName: 'Doe'
        };

        expect(() => UserEntity.fromObject(data)).toThrow(CustomError);
        expect(() => UserEntity.fromObject(data)).toThrow('Missing id');
    });

    it('should throw a CustomError when name is missing', () => {
        const data = {
            id: '123',
            email: 'johndoe@example.com',
            password: 'password123',
            emailIsVerified: true,
            lastName: 'Doe'
        };

        expect(() => UserEntity.fromObject(data)).toThrow(CustomError);
        expect(() => UserEntity.fromObject(data)).toThrow('Missing name');
    });

    it('should throw a CustomError when email is missing', () => {
        const data = {
            id: '123',
            name: 'John Doe',
            password: 'password123',
            emailIsVerified: true,
            lastName: 'Doe'
        };

        expect(() => UserEntity.fromObject(data)).toThrow(CustomError);
        expect(() => UserEntity.fromObject(data)).toThrow('Missing email');
    });

    it('should throw a CustomError when emailIsVerified is missing', () => {
        const data = {
            id: '123',
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            lastName: 'Doe'
        };

        expect(() => UserEntity.fromObject(data)).toThrow(CustomError);
        expect(() => UserEntity.fromObject(data)).toThrow('Missing emailValidated');
    });

    it('should throw a CustomError when password is missing', () => {
        const data = {
            id: '123',
            name: 'John Doe',
            email: 'johndoe@example.com',
            emailIsVerified: true,
            lastName: 'Doe'
        };

        expect(() => UserEntity.fromObject(data)).toThrow(CustomError);
        expect(() => UserEntity.fromObject(data)).toThrow('Missing password');
    });

    it('should accept _id instead of id and create a UserEntity instance', () => {
        const data = {
            _id: '123',
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            emailIsVerified: true,
            lastName: 'Doe'
        };

        const user = UserEntity.fromObject(data);

        expect(user).toBeInstanceOf(UserEntity);
        expect(user.id).toBe('123');
        expect(user.name).toBe('John Doe');
        expect(user.email).toBe('johndoe@example.com');
        expect(user.password).toBe('password123');
        expect(user.emailIsVerified).toBe(true);
        expect(user.lastName).toBe('Doe');
    });
});