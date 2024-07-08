

import { Prop, Schema } from "@nestjs/mongoose";
import { Message } from "./message.schema";

@Schema()
export class TextMessage extends Message {

    @Prop()
    content: string

    @Prop()
    images: string[]

}