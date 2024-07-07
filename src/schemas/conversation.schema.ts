import { Prop, Schema } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { UserEntity } from "./user.schemas";
import { DoctorEntity } from "./doctor.schema";
import { MessageEntity } from "./message.schema";


@Schema()
export class ConversationEntity extends Document {

    @Prop({ type: Types.ObjectId, ref: UserEntity.name })
    sender: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: DoctorEntity.name })
    reciver: Types.ObjectId

    @Prop([{ type: Types.ObjectId, ref: MessageEntity.name }])
    messages: Types.ObjectId[]

    @Prop({ type: Types.ObjectId, ref: ConversationEntity.name })
    extra: Types.ObjectId

}