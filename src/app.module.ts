import {  Module } from '@nestjs/common';

import { AuthModule } from './module/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { NotificationModule } from './module/notification/notification.module';
import { AppointmentModule } from './module/appointment/appointment.module';
import { UserModule } from './module/user/user.module';


const databaseModule = MongooseModule.forRoot(process.env.MONGO_URI, {
  dbName: 'DocDoc',
  connectionFactory: (connection) => {
    if (connection.readyState === 1) {
      console.log('Database Connected successfully >> ', connection.name);
    }
    connection.on('disconnected', () => {
      console.log('Database disconnected');
    });
    connection.on('error', (error) => {
      console.log('Database connection failed! for error: ', error);
    });
    return connection;
  },
});





@Module({
  imports: [
    AuthModule,
    databaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10h' }
    }),
    NotificationModule,
    AppointmentModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
