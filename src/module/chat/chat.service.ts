import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Conversation } from 'src/core/models/conversation.schema';
import { Model, Types } from 'mongoose';
import { Message } from 'src/core/models/message.schema';
import { CloudinaryService, Pagination } from '@app/common';
import { TextMessage } from 'src/core/models/textmessage.schema';
import { User } from 'src/core/models/user.schemas';
import { ChatGateway } from './chat.gateway';

@Injectable()
export class ChatService {

  constructor(
    @InjectModel(Conversation.name) private conversationModel: Model<Conversation>,
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(TextMessage.name) private textMessageModel: Model<TextMessage>,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly cloudinary: CloudinaryService,
  ) {

  }

  async updateStatus(userId: Types.ObjectId, socketId?: string) {
    if (!socketId) return await this.userModel.findByIdAndUpdate(
      userId,
      { $unset: { socketId: '' } },
    );

    await this.userModel.findByIdAndUpdate(
      userId,
      { socketId },
    );
  }

  async messageSeen(messageId: Types.ObjectId , reciverId: Types.ObjectId) {
    const message = await this.messageModel.findById(messageId);
    if (!message) throw new HttpException('Message not found', 404);
    
      
    const reciver = await this.userModel.findById(reciverId);
    if (!reciver) throw new HttpException('Reciver not found', 404);
    
    return reciver.socketId;
  }

  async sendTextMessage(
    args: {
      reciverId: Types.ObjectId,
      senderId: Types.ObjectId,
      content: string,
      images?: Express.Multer.File[]
    }
  ) {
    const { reciverId, senderId, content, images } = args;



    const revicer = await this.userModel.findById(reciverId);
    if (!revicer) throw new HttpException('Reciver not found', 404);

    const sender = await this.userModel.findById(senderId);
    if (!sender) throw new HttpException('Sender not found', 404);


    const message = await this.textMessageModel.create({
      sender: {
        id: senderId,
        name: sender.name,
        pic: sender.pic,
      },
      content,
      images: images ? (await this.cloudinary.uploadMultiple(images)).map(image => image.url) : undefined
    });

    const conversation = await this.conversationModel.findOne(
      {
        members: { $all: [reciverId, senderId] }
      },
    );
    if (conversation) {
      conversation.lastMessage = message._id;
    }
    if (!conversation) {
      await this.conversationModel.create({
        members: [reciverId, senderId],
        lastMessage: message._id
      })

    }

    return {
      message, reciver: revicer.socketId
    }








  }





}
