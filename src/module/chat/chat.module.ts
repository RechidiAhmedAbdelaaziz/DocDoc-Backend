import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { Conversation } from 'src/core/models/conversation.schema';
import { Message } from 'src/core/models/message.schema';
import { TextMessage } from 'src/core/models/textmessage.schema';
import { VoiceMessage } from 'src/core/models/voicemessage.schema';
import { AuthModule } from '../auth/auth.module';
import { ChatController } from './chat.controller';
import { CloudinaryModule } from '@app/common';

const databaseModule = MongooseModule.forFeature([
  { name: Conversation.name, schema: SchemaFactory.createForClass(Conversation) },
  {
    name: Message.name, schema: SchemaFactory.createForClass(Message),
    discriminators: [
      { name: TextMessage.name, schema: SchemaFactory.createForClass(TextMessage) },
      { name: VoiceMessage.name, schema: SchemaFactory.createForClass(VoiceMessage) }
    ]
  }
]);

@Module({
  imports: [AuthModule, databaseModule, CloudinaryModule],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule { }
