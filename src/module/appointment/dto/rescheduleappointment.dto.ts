import { IsDateString } from "class-validator";


export class RescheduleAppointmentDTO {
    @IsDateString()
    date: Date;

}