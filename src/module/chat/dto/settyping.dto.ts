import { IsMongoId, IsOptional } from "class-validator";
import { Types } from "mongoose";

export class TypingStatusDTO {
    @IsMongoId()
    conversation: Types.ObjectId

    @IsOptional()
    @IsMongoId()
    userTyping: Types.ObjectId
}