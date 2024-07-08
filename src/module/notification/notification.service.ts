import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notification } from 'src/core/models/notification.schema';

@Injectable()
export class NotificationService {

    constructor(
        @InjectModel(Notification.name) private readonly notificationModel: Model<Notification>
    ) { }

    createNotification = async (
        data: { title: string, description: string, user: Types.ObjectId }) => {
        const notification = new this.notificationModel(data);
        await notification.save();
    }
}
