import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class UserDTO {
    @IsNotEmpty()
    name:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;
    
    @IsStrongPassword()
    @IsNotEmpty()
    password:string;
}
