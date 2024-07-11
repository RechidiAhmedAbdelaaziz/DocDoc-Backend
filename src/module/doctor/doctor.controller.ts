import { Body, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { AuthGuard, ResponseHandler } from '@app/common';
import { ListDoctorsDTO } from './dto/listdoctors.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @UseGuards(AuthGuard)
  @Get() //* DOCTOR | List ~ {{host}}/api/v1/doctor
  async listDoctors(
    @Query() query: ListDoctorsDTO
  ) {

    const resutl = await this.doctorService.listDoctors(query);

    return new ResponseHandler(resutl, 'Doctors listed successfully');
  }


}
