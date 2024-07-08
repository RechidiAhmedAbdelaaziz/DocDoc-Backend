import { IsEnum, IsOptional, IsString } from "class-validator";
import { RegisterDTO } from "./register.dto";

export class DoctorRegisterDTO extends RegisterDTO {
    @IsEnum(["Doctor", "Dentist", "Hairdresser", "Personal Trainer"], {
        message: "Role must be either Doctor, Dentist, Hairdresser or Personal Trainer"
    })
    role: "Doctor" | "Dentist" | "Hairdresser" | "Personal Trainer"

    @IsOptional()
    @IsString()
    description: string;

}

// {"email":"string","name":"string","password":"string","phone":"string","role":"Doctor","description":"string}
