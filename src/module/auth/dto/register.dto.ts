import { IsName } from "@app/common";
import { IsAlpha, IsEmail, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class RegisterDTO {

    @IsName()
    name: string;

    @IsEmail()
    readonly email: string;

    @IsPhoneNumber('DZ')
    readonly phone: string;

    @IsStrongPassword()
    readonly password: string;
}

// {"name" : "rechidi", "email" : "rechidi@gmail.com", "phone" : "0559877929", "password" : "String123@"}
