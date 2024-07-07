import { Prop, Schema } from "@nestjs/mongoose";
import { MessageEntity } from "./message.schema";

@Schema()
export class VoiceMessageEntity extends MessageEntity {

    @Prop()
    voice: string; //Voice url
    
}