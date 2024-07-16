import { Body, Controller, Get, Logger, Param, ParseArrayPipe, Patch, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { HttpAuthGuard, CurrentUser, JwtPayload, ResponseHandler } from '@app/common';
import { Types } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProfileDTO } from './dto/updateprofile.dto';

@UseGuards(HttpAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('me') //* USER | Me ~ {{host}}api/v1/user/me
  async getMyProfile(
    @CurrentUser() user: JwtPayload,
    @Query('fields',) fields: string,
  ) {
    const result = await this.userService.fetchProfile(user.id, { fields })

    return new ResponseHandler(result, 'Successfully fetched your profile')
  }

  @Get(':id') //* USER | Get ~ {{host}}api/v1/user/:id
  async getUserProfile(
    @Param('id') id: Types.ObjectId,
    @Query('fields',) fields?: string,
  ) {

    const result = await this.userService.fetchProfile(id, { fields })

    return new ResponseHandler(result, `Successfully fetched ${result.name} profile`)
  }

  @Patch('me') //* USER | Update ~ {{host}}api/v1/user/me
  @UseInterceptors(FileInterceptor('image'))
  async updateMyProfile(
    @CurrentUser() user: JwtPayload,
    @UploadedFile() image?: Express.Multer.File,
    @Body() data?: UpdateProfileDTO
  ) {

    const result = await this.userService.updateProfile({ ...data, image, id: user.id })

    return new ResponseHandler(result, 'Successfully updated your profile')
  }
}
