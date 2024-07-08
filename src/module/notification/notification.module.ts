import { Global, Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { Notification } from 'src/core/models/notification.schema';

const databaseModule = MongooseModule.forFeature([
  { name: Notification.name, schema: SchemaFactory.createForClass(Notification) }
]);

@Global()
@Module({
  imports: [databaseModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule { }
