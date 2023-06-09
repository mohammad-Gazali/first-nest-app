import { IsEmail, IsNotEmpty, IsString } from "class-validator";



export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    firstname?: string;

    @IsString()
    lastname?: string;
}

export class AuthDtoSignIn {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}