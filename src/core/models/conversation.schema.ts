import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "./user.schemas";
import { Message } from "./message.schema";
import { AbstractSchema } from "./abstract.schema";


@Schema()
export class Conversation extends AbstractSchema {

    @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
    members: Types.ObjectId[]

    @Prop({ type: Types.ObjectId, ref: 'Message' })
    lastMessage: Types.ObjectId


}