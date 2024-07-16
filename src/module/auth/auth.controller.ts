import { Controller, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { HttpAuthGuard, CurrentUser, JwtPayload, ParseMonogoIdPipe as ParseMongoIdPipe, ResponseHandler } from '@app/common';
import { RefreshTokenDTO } from './dto/refreshtoken.dto';
import { ForgotPasswordDTO } from './dto/forgotpassword.dto';
import { ResetPasswordDTO } from './dto/resetpassword.dto';
import { DoctorRegisterDTO } from './dto/doctorregister.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')  //* AUTH | Register   ~ {{host}}api/v1/auth/register
  register(@Body() body: RegisterDTO) {
    return this.authService.register(body);
  }

  @Post('doctor-register')  //* AUTH | Doctor Register   ~ {{host}}api/v1/auth/doctor-register
  doctorRegister(@Body() body: DoctorRegisterDTO) {
    return this.authService.registerDoctor(body);
  }

  @Post('login')  //* AUTH | Login   ~ {{host}}api/v1/auth/login
  async login(@Body() body: LoginDTO) {
    const result = await this.authService.login(body);
    return new ResponseHandler(result, 'Logged in successfully');
  }



  @UseGuards(HttpAuthGuard)
  @Patch('refresh-token')  //* AUTH | Refresh Token   ~ {{host}}api/v1/auth/refresh-token
  async refreshToken(@Body() body: RefreshTokenDTO, @CurrentUser() user: JwtPayload) {

    const userID = user.id;

    const result = await this.authService.refreshToken({ token: body.token, userId: userID });

    return new ResponseHandler(result, 'Token refreshed successfully');
  }


  @Post('forgot-password')  //* AUTH | Forgot Password   ~ {{host}}api/v1/auth/forgot-password
  async forgotPassword(@Body() data: ForgotPasswordDTO) {
    const result = await this.authService.forgotPassword({ login: data.login });
    return new ResponseHandler(result, 'Password reset OTP sent successfully');
  }

  @Patch('reset-password')  //* AUTH | Reset Password   ~ {{host}}api/v1/auth/reset-password
  async resetPassword(
    @Body() data: ResetPasswordDTO,

  ) {
    const result = await this.authService.resetPassword(data);
    return new ResponseHandler(result, 'Password reset successfully');
  }





}
