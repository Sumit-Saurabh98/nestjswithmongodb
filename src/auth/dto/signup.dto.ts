import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignUpDto {

    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    readonly name: string;

    @IsString({ message: 'Email must be a string' })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email is not valid' })
    readonly email: string;

    @IsNotEmpty({ message: 'Passwotd is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    readonly password: string;
}