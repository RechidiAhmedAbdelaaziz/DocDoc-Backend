import { Prop, Schema as ISchema } from "@nestjs/mongoose";
import { Schema, Types } from "mongoose";
import { User } from "./user.schemas";
import { Message } from "./message.schema";
import { AbstractSchema } from "./abstract.schema";


@ISchema()
export class Conversation extends AbstractSchema {

    @Prop({ type: [{ type: Schema.Types.ObjectId, ref: User.name }] })
    members: Schema.Types.ObjectId[]

    @Prop({ type: Types.ObjectId, ref: 'Message' })
    lastMessage: Types.ObjectId


}