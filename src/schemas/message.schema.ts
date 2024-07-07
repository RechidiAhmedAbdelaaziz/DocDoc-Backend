import { Prop, Schema } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { UserEntity } from "./user.schemas";

@Schema()
export class MessageEntity extends Document {
    @Prop({ type: Types.ObjectId, ref: UserEntity.name })
    sender: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: UserEntity.name })
    reciver: Types.ObjectId

    @Prop()
    isSeen: boolean;

    @Prop({ type: Date, default: Date.now })
    sendAt: Date
}