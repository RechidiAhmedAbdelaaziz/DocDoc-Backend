import { IsNotEmpty } from "class-validator";

export class LoginDTO {

    @IsNotEmpty()
    login: string;

    password: string;
}

//{"login":"string","password":"string"} 