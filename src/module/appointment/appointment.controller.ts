import { Body, Controller, Delete, Logger, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AuthGuard, CurrentUser, JwtPayload, ParsrMonogoIdPipe, ResponseHandler } from '@app/common';
import { SendAppointmentRequestDTO } from './dto/sendappointmentrequest.dto';
import { Types } from 'mongoose';

@UseGuards(AuthGuard)
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }


  @Post('request/:id') //* APPOINTMENT | Send Request   ~ {{host}}api/v1/appointment/request/:id
  async sendRequest(
    @Body() data: SendAppointmentRequestDTO,
    @CurrentUser() user: JwtPayload,
    @Param('id', ParsrMonogoIdPipe) id: Types.ObjectId,
  ) {

    const result = await this.appointmentService.sendRequest({
      ...data,
      doctorId: id,
      patientId: user.id,
    })

    return new ResponseHandler(result, 'Appointment Request Sent Successfully')
  }

  @Patch('request/:id') //* APPOINTMENT | Accept Request   ~ {{host}}api/v1/appointment/request/:id
  async acceptRequest(
    @Param('id', ParsrMonogoIdPipe) id: Types.ObjectId,
    @CurrentUser() user: JwtPayload,
  ) {

    

    const result = await this.appointmentService.acceptRequest({
      requestId: id,
      doctorId: user.id,
    })

    return new ResponseHandler(result, 'Appointment Request Accepted Successfully')
  }

  @Delete('request/:id') //* APPOINTMENT | Cancel Request   ~ {{host}}api/v1/appointment/request/:id
  async cancelRequest(
    @Param('id', ParsrMonogoIdPipe) id: Types.ObjectId,
    @CurrentUser() user: JwtPayload,
  ) {

    const result = await this.appointmentService.cancelRequest({
      requestId: id,
      userId: user.id,
    })

    return new ResponseHandler(result, 'Appointment Request Canceled Successfully')
  }


}
