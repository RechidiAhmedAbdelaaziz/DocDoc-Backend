import { Body, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { AuthGuard, ParserMonogoIdPipe, ResponseHandler } from '@app/common';
import { ListDoctorsDTO } from './dto/listdoctors.dto';
import { Types } from 'mongoose';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @UseGuards(AuthGuard)
  @Get() //* DOCTOR | List ~ {{host}}api/v1/doctor
  async listDoctors(
    @Query() query: ListDoctorsDTO
  ) {

    const resutl = await this.doctorService.listDoctors(query);

    return new ResponseHandler(resutl, 'Doctors listed successfully');
  }

  @UseGuards(AuthGuard)
  @Get(':id') //* DOCTOR | Get ~ {{host}}api/v1/doctor/:id
  async getDoctorById(
    @Param('id', ParserMonogoIdPipe) id: Types.ObjectId,
    @Query('fields') fields: string
  ) {
    const result = await this.doctorService.getDoctorById(id, { fields });

    return new ResponseHandler(result, 'Doctor fetched successfully');
  }


}
