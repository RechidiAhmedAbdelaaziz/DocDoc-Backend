import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Conversation } from 'src/core/models/conversation.schema';
import { Model, Types } from 'mongoose';
import { Message } from 'src/core/models/message.schema';
import { CloudinaryService, Pagination } from '@app/common';
import { TextMessage } from 'src/core/models/textmessage.schema';
import { User } from 'src/core/models/user.schemas';
import { ChatGateway } from './chat.gateway';
import path from 'path';

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

  async messageSeen(messageId: Types.ObjectId, reciverId: Types.ObjectId) {
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

    let conversation = await this.conversationModel.findOne({
      members: { $all: [reciverId, senderId] }
    });

    if (!conversation) {
      conversation = new this.conversationModel({
        members: [reciverId, senderId]
      });
    }

    const message = await this.textMessageModel.create({
      conversation: conversation._id,
      sender: senderId,
      content,
      images: images ? (await this.cloudinary.uploadMultiple(images)).map(image => image.url) : undefined
    });

    conversation.lastMessage = message._id;
    await conversation.save();

    return { message, reciver: revicer.socketId };

  }


  async listMessages(conversationId: Types.ObjectId, options?: {
    limit?: number,
    page?: number
  }) {

    const conversation = await this.conversationModel.findById(conversationId);
    if (!conversation) throw new HttpException('Conversation not found', 404);

    const { generate, limit, page } = new Pagination(
      this.messageModel,
      { filter: { conversation: conversationId }, ...options }
    ).getOptions();

    const messages = await this.messageModel.find({ conversation: conversationId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * (page - 1))



    const pagination = await generate(messages);

    return { messages, pagination };

  }

  async listConversations(userId: Types.ObjectId, options?: {
    limit?: number,
    page?: number
  }) {

    const user = await this.userModel.findById(userId);
    if (!user) throw new HttpException('User not found', 404);

    const { generate, limit, page } = new Pagination(
      this.conversationModel,
      { filter: { members: { $in: userId } }, ...options }
    ).getOptions();

    const conversations = await this.conversationModel.find({ members: { $in: userId } })
      .sort({ updatedAt: -1 })
      .limit(limit)
      .skip(limit * (page - 1))
      .populate({
        path: 'lastMessage',
      }).populate({
        path: 'members',
        select: 'name pic'
      });


    const pagination = await generate(conversations);

    return { conversations, pagination };

  }



}
