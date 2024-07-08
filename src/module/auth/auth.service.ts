import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/core/models/user.schemas';
import { RegisterDTO } from './dto/register.dto';
import { ResponseHandler } from '@app/common';
import { compare, hash } from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { v4 } from 'uuid';
import { RefreshToken } from 'src/core/models/refreshtoken.schema';
import { Otp } from 'src/core/models/otp.schema';
import { isEmail, isPhoneNumber } from 'class-validator';
import { getRandomValues } from 'crypto';


@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>,
    @InjectModel(Otp.name) private otpModel: Model<Otp>,
  ) { }



  register = async (data: RegisterDTO) => {
    const { email, name, password, phone } = data;

    const checkUser = await this.userModel.findOne({ $or: [{ email }, { phone }] });
    if (checkUser) throw new HttpException('Email or phone already used', 400);

    const hashedPassword = await hash(password, 10);

    const user = await this.userModel.create({
      email,
      name,
      phone,
      password: hashedPassword
    });

    const tokens = await this.generateToken(user._id);
    const { password: pass, ...userDetails } = user.toObject();


    return { ...tokens, user: userDetails };
  }

  login = async (data: LoginDTO) => {
    const { login, password } = data;

    const user = await this.userModel.findOne(
      { $or: [{ email: login }, { phone: login }] }
    ).select('+password');
    if (!user) throw new HttpException('Email or phone not found', 400);

    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch) throw new HttpException('Invalid credentials', 400);

    const { accessToken, refreshToken } = await this.generateToken(user._id);
    const { password: pass, ...userDetails } = user.toObject();


    return { accessToken, refreshToken, user: userDetails }
  }


  refreshToken = async (args: { token: string, userId: Types.ObjectId }) => {
    const { token, userId } = args;


    const refreshToken = await this.refreshTokenModel.findOneAndDelete({ userId, token });
    if (!refreshToken) throw new HttpException('Invalid refresh token', 400);

    const tokens = await this.generateToken(refreshToken.userId);

    return tokens;

  }

  forgotPassword = async (args: { login: string }) => {
    const { login } = args;

    this.isLogin(login);

    const user = await this.userModel.findOne({ $or: [{ email: login }, { phone: login }] });
    if (!user) throw new HttpException('Email or phone not found', 400);

    this.generateOTP(user._id);


  }

  resetPassword = async (data: { login: string, otp: number, password: string }) => {
    const { login, otp, password } = data;

    this.isLogin(login);

    const user = await this.userModel.findOne({ $or: [{ email: login }, { phone: login }] });
    if (!user) throw new HttpException('Email or phone not found', 400);

    const otpData = await this.otpModel.findOne({ user: user._id });
    if (!otpData) throw new HttpException('OTP not found', 400);

    if (otpData.otp !== otp) throw new HttpException('Invalid OTP', 400);

    const hashedPassword = await hash(password, 10);
    user.password = hashedPassword;

    Promise.all([
      user.save(),
      otpData.deleteOne()
    ])

  }



  private isLogin(login: string) {
    if (!(isPhoneNumber(login, 'DZ') || isEmail(login))) throw new HttpException('Invalid login', 400);

  }

  private async generateOTP(user: Types.ObjectId,) {
    const otpCode = getRandomValues(new Uint8Array(2)).join('');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 2);

    await this.otpModel.findOneAndUpdate(
      { user }, { otp: otpCode, expiresAt }, { upsert: true, new: true }
    )
  }

  private async generateToken(userId: Types.ObjectId) {
    const accessToken = this.jwtService.sign(
      { id: userId }, { secret: process.env.JWT_SECRET, expiresIn: '10h' });

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    const refreshToken = await this.refreshTokenModel.findOneAndUpdate(
      { userId: userId }, { token: v4(), expires }, { upsert: true, new: true })

    return { accessToken, refreshToken: refreshToken.token };
  }





}
