import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@WebSocketGateway({
  cors : {
    origin: '*',
    // methods: ['GET', 'POST'],
  }
})
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage('joinRoom')
  joinRoom(@MessageBody() room: string) {
    // return this.chatService.joinRoom(room);
  }

  @SubscribeMessage('typing')
  typing(@MessageBody() data: any) {
    // return this.chatService.typing(data);
  }




}
