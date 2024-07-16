import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { AbstractSchema } from "./abstract.schema";
import { Conversation } from "./conversation.schema";
import { User } from "./user.schemas";

@Schema({
    discriminatorKey: 'type',
    timestamps: true,
})
export class Message extends AbstractSchema {

    @Prop({ type: Types.ObjectId, ref: Conversation.name, index: true })
    conversation: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: User.name })
    sender: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: Message.name })
    lastMessage: Types.ObjectId

}