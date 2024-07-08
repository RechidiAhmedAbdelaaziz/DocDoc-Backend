import { IsAlpha, IsEmail, IsPhoneNumber, IsStrongPassword } from "class-validator";

export class RegisterDTO {

    @IsAlpha()
    name: string;

    @IsEmail()
    readonly email: string;

    @IsPhoneNumber('DZ')
    readonly phone: string;

    @IsStrongPassword()
    readonly password: string;
}

// {"name" : "rechidi", "email" : "rechidi@gmail.com", "phone" : "0559877929", "password" : "String123@"}
