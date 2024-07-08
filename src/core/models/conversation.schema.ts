import { Prop, Schema } from "@nestjs/mongoose";
import {  Types } from "mongoose";
import { User } from "./user.schemas";
import { Doctor } from "./doctor.schema";
import { Message } from "./message.schema";
import { AbstractSchema } from "./abstract.schema";


@Schema()
export class Conversation extends AbstractSchema {

    @Prop({ type: Types.ObjectId, ref: User.name })
    sender: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: Doctor.name })
    reciver: Types.ObjectId

    @Prop([{ type: Types.ObjectId, ref: Message.name }])
    messages: Types.ObjectId[]

    @Prop({ type: Types.ObjectId, ref: Conversation.name })
    extra: Types.ObjectId

}