import { IsArray, IsOptional, IsString } from "class-validator";

export class SendTextMessageDTO {

    @IsOptional()
    @IsArray({ message: 'Images must be an array of images' })
    images: Express.Multer.File[];

    @IsString()
    content: string;

}
