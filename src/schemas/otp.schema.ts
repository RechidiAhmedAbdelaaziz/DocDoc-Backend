import { Prop, Schema } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { UserEntity } from "./user.schemas";

@Schema()
export class OtpEntity extends Document {

    @Prop({ type: Types.ObjectId, ref: UserEntity.name })
    user: Types.ObjectId

    @Prop()
    otp: number
}