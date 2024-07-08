import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "./user.schemas";
import { AbstractSchema } from "./abstract.schema";

@Schema()
export class Message extends AbstractSchema {
    @Prop({ type: Types.ObjectId, ref: User.name })
    sender: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: User.name })
    reciver: Types.ObjectId

    @Prop()
    isSeen: boolean;

    @Prop({ type: Date, default: Date.now })
    sendAt: Date
}