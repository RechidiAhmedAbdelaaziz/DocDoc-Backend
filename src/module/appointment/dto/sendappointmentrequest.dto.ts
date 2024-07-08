import { IsDateString, IsString } from "class-validator";


export class SendAppointmentRequestDTO {
    @IsDateString()
    date: Date;

    @IsString()
    message: string;
    
}