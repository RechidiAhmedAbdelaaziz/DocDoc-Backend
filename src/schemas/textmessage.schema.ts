

import { Prop, Schema } from "@nestjs/mongoose";
import { MessageEntity } from "./message.schema";

@Schema()
export class TextMessageEntity extends MessageEntity {

    @Prop()
    content: string

    @Prop()
    images: string[]

}