import { IsName } from "@app/common";
import { IsEmail, IsOptional, IsPhoneNumber } from "class-validator";

export class UpdateProfileDTO {

    @IsOptional()
    @IsName()
    name: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsPhoneNumber('DZ')
    phone: string;


}