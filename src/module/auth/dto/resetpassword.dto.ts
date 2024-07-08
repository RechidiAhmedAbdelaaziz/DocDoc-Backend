import { IsNumber, IsString, IsStrongPassword } from "class-validator";

export class ResetPasswordDTO {
    @IsString()
    login: string;

    @IsNumber()
    otp: number;

    @IsStrongPassword()
    password: string;
}

//{"login":"string","otp":0,"password":"string"}