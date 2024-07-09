import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class FetchAppointmentsDTO {
    @IsOptional()
    @IsString()
    status: string;

    @IsDateString()
    date: Date;


}