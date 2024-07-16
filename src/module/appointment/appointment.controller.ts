import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { HttpAuthGuard, CurrentUser, JwtPayload, ParseMonogoIdPipe, ResponseHandler } from '@app/common';
import { SendAppointmentRequestDTO } from './dto/sendappointmentrequest.dto';
import { Types } from 'mongoose';
import { FetchAppointmentsDTO } from './dto/fetchappointments.dto';
import { RescheduleAppointmentDTO } from './dto/rescheduleappointment.dto';

@UseGuards(HttpAuthGuard)
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }


  @Post('request/:id') //* REQUEST | Send    ~ {{host}}api/v1/appointment/request/:id
  async sendRequest(
    @Body() data: SendAppointmentRequestDTO,
    @CurrentUser() user: JwtPayload,
    @Param('id', ParseMonogoIdPipe) id: Types.ObjectId,
  ) {

    const result = await this.appointmentService.sendRequest({
      ...data,
      doctorId: id,
      patientId: user.id,
    })

    return new ResponseHandler(result, 'Appointment Request Sent Successfully')
  }

  @Patch('request/:id') //* REQUEST | Accept    ~ {{host}}api/v1/appointment/request/:id
  async acceptRequest(
    @Param('id', ParseMonogoIdPipe) id: Types.ObjectId,
    @CurrentUser() user: JwtPayload,
  ) {



    const result = await this.appointmentService.acceptRequest({
      requestId: id,
      doctorId: user.id,
    })

    return new ResponseHandler(result, 'Appointment Request Accepted Successfully')
  }

  @Delete('request/:id') //* REQUEST | Cancel    ~ {{host}}api/v1/appointment/request/:id
  async cancelRequest(
    @Param('id', ParseMonogoIdPipe) id: Types.ObjectId,
    @CurrentUser() user: JwtPayload,
  ) {

    const result = await this.appointmentService.cancelRequest({
      requestId: id,
      userId: user.id,
    })

    return new ResponseHandler(result, 'Appointment Request Canceled Successfully')
  }

  @Get() //* APPOINTMENT | Get All   ~ {{host}}api/v1/appointment
  async getAllAppointments(
    @CurrentUser() user: JwtPayload,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Body() data: FetchAppointmentsDTO,
  ) {
    const result = await this.appointmentService.fetchAppointments(
      {
        userId: user.id,
        page,
        limit,
        ...data,
      }
    )

    return new ResponseHandler(result, 'All Appointments Fetched Successfully')
  }

  @Get(':id') //* APPOINTMENT | Get One   ~ {{host}}api/v1/appointment/:id
  async getAppointment(
    @Param('id', ParseMonogoIdPipe) id: Types.ObjectId,
    @CurrentUser() user: JwtPayload,
  ) {
    const result = await this.appointmentService.fetchAppointment({
      userId: user.id,
      appointmentId: id,
    })

    return new ResponseHandler(result, 'Appointment Fetched Successfully')
  }


  @Patch(':id') //* APPOINTMENT | reschedule   ~ {{host}}api/v1/appointment/:id
  async rescheduleAppointment(
    @Param('id', ParseMonogoIdPipe) id: Types.ObjectId,
    @CurrentUser() user: JwtPayload,
    @Body() data: RescheduleAppointmentDTO,
  ) {
    const result = await this.appointmentService.rescheduleAppointment({
      userId: user.id,
      appointmentId: id,
      ...data,
    })

    return new ResponseHandler(result, 'Appointment Rescheduled Successfully')
  }
}
