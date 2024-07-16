import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, WsException } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server } from 'socket.io';
import { ServerToClientEvents } from './types/events.gateway';
import { Socket } from 'socket.io';
import { ParseMonogoIdPipe, WsAuthGuard } from '@app/common';
import { Message } from 'src/core/models/message.schema';
import { DbDocument } from 'src/core/types/dbdocument';
import { Logger } from '@nestjs/common';
import { Types } from 'mongoose';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  namespace: 'chat'
})
export class ChatGateway {

  @WebSocketServer()
  server: Server<any, ServerToClientEvents>;

  constructor(private readonly chatService: ChatService) { }

  async handleConnection(
    @ConnectedSocket() client: Socket,

  ) {
    try {
      WsAuthGuard.verify(client);
      await this.chatService.updateStatus(client.user.id, client.id);
    }
    catch (error) { }

  }

  sendMessage(reciverId: string, payload: DbDocument<Message>) {
    Logger.log(`Sending message to ${reciverId}`);
    this.server.to(reciverId).emit('newMessage', payload);
  }

  @SubscribeMessage('seeMessage')
  async messageSeen(
    @MessageBody('message', ParseMonogoIdPipe) messageId: Types.ObjectId,
    @MessageBody('reciver', ParseMonogoIdPipe) revicerId: Types.ObjectId,
    @ConnectedSocket() client: Socket,
  ) {
    {
      const reciver = await this.chatService.messageSeen(messageId, revicerId);
      this.server.to(reciver).emit('messageSeen', messageId);
    }

  }

  async handleDisconnect(
    @ConnectedSocket() client: Socket,
  ) {
    Logger.log(`User ${client.user.id} disconnected`);
    await this.chatService.updateStatus(client.user.id);
  }
}
