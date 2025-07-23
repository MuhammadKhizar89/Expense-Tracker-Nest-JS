import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class signUpDTO {
    @IsNotEmpty()
    name:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;
    
    @IsStrongPassword()
    @IsNotEmpty()
    password:string;
}

export class signInDTO {
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    password:string;
}