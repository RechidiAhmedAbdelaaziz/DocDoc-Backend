import { IsNumber, IsOptional, IsString } from "class-validator";


export class ListDoctorsDTO {
    @IsOptional()
    @IsString()
    search : string;


    @IsOptional()
    @IsString()
    specialty : string;

    @IsOptional()
    @IsString()
    sort : string;

    @IsOptional()
    @IsNumber()
    page : number;

    @IsOptional()
    @IsNumber()
    limit : number;


}