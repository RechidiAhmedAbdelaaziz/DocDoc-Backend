import { IsNumber, IsOptional } from "class-validator";




export class ListMessagesQueryDTO {
    @IsOptional()
    @IsNumber()
    page?: number;

    @IsOptional()
    @IsNumber()
    limit?: number;
}