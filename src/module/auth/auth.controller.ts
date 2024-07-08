import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard, CurrentUser, JwtPayload, ResponseHandler } from '@app/common';
import { RefreshTokenDTO } from './dto/refreshtoken.dto';
import { Request } from 'express';
import { ForgotPasswordDTO } from './dto/forgotpassword.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')  //* AUTH | Register   ~ {{host}}api/v1/auth/register
  register(@Body() body: RegisterDTO) {
    return this.authService.register(body);
  }

  @Post('login')  //* AUTH | Login   ~ {{host}}api/v1/auth/login
  async login(@Body() body: LoginDTO) {
    const result = await this.authService.login(body);
    return new ResponseHandler(result, 'Logged in successfully');
  }

  @UseGuards(AuthGuard)
  @Patch('refresh-token')  //* AUTH | Refresh Token   ~ {{host}}api/v1/auth/refresh-token
  async refreshToken(@Body() body: RefreshTokenDTO, @CurrentUser() user: JwtPayload) {

    const userID = user.id;

    const result = await this.authService.refreshToken({ token: body.token, userId: userID });

    return new ResponseHandler(result, 'Token refreshed successfully');
  }

  @UseGuards(AuthGuard)
  @Post('forgot-password')  //* AUTH | Forgot Password   ~ {{host}}api/v1/auth/forgot-password
  async forgotPassword(@Body() body: ForgotPasswordDTO) {
    const result = await this.authService.forgotPassword({ login: body.login });
    return new ResponseHandler(result, 'Password reset OTP sent successfully');
  }


}
