import { Body, Controller, Get, Logger, Param, ParseIntPipe, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ChatService } from './chat.service';
import { HttpAuthGuard, CurrentUser, JwtPayload, PaginationParamsDTO, ParseMonogoIdPipe, ResponseHandler } from '@app/common';
import { Types } from 'mongoose';
import { ChatGateway } from './chat.gateway';
import { SendTextMessageDTO } from './dto/sendmessage.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@UseGuards(HttpAuthGuard)
@Controller('chat')
export class ChatController {

    constructor(
        private readonly chatService: ChatService,
        private readonly chatGateway: ChatGateway,

    ) { }


    @Get('messages/:conversationId') //* CHAT | List Messages ~ {{host}}api/v1/chat/messages/:reciverId
    async listMessages(
        @Param('conversationId', ParseMonogoIdPipe) conversationId: Types.ObjectId,
        @Query() query?: PaginationParamsDTO,
    ) {
        
        const result = await this.chatService.listMessages(conversationId, query);
        return new ResponseHandler(result, 'Messages listed successfully');
    }

    @Post('text/:reciverId') //* CHAT | Send Text Message ~ {{host}}api/v1/chat/text/:reciverId
    @UseInterceptors(FilesInterceptor('images'))
    async sendMessage(
        @Param('reciverId', ParseMonogoIdPipe) reciverId: Types.ObjectId,
        @CurrentUser() user: JwtPayload,
        @Body() data: SendTextMessageDTO,
        @UploadedFiles() images?: Array<Express.Multer.File>
    ) {
        data.images = images;
        const senderId = user.id;
        const { message, reciver } = await this.chatService.sendTextMessage({ ...data, reciverId, senderId });
        this.chatGateway.sendMessage(reciver, message);

        return new ResponseHandler(message, 'Message sent successfully');
    }

    @Get('conversations') //* CHAT | List Conversations ~ {{host}}api/v1/chat/conversations
    async listConversations(
        @CurrentUser() user: JwtPayload,
        @Query() query?: PaginationParamsDTO,
    ) {
        const result = await this.chatService.listConversations(user.id, query);
        return new ResponseHandler(result, 'Conversations listed successfully');
    }


}
