import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { AppointmentRequest } from 'src/core/models/appointmentrequest.schema';
import { Appointment } from 'src/core/models/appointment.schema';

const databaseModule = MongooseModule.forFeature([
  { name: AppointmentRequest.name, schema: SchemaFactory.createForClass(AppointmentRequest) },
  { name: Appointment.name, schema: SchemaFactory.createForClass(Appointment) }
])


@Module({
  imports: [
    AuthModule,
    databaseModule
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, JwtService],
})
export class AppointmentModule { }
