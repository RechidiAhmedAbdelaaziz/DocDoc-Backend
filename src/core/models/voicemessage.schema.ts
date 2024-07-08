import { Prop, Schema } from "@nestjs/mongoose";
import { Message } from "./message.schema";

@Schema()
export class VoiceMessage extends Message {

    @Prop()
    voice: string; //Voice url

}