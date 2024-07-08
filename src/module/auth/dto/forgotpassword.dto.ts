import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ForgotPasswordDTO {

    @IsString()
    login: string;
}