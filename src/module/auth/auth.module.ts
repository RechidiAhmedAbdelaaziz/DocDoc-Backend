import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/core/models/user.schemas';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RefreshToken } from 'src/core/models/refreshtoken.schema';
import { Otp } from 'src/core/models/otp.schema';
import { Doctor } from 'src/core/models/doctor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name, schema: SchemaFactory.createForClass(User), discriminators: [
          { name: Doctor.name, schema: SchemaFactory.createForClass(Doctor) }
        ]
      },
      { name: RefreshToken.name, schema: SchemaFactory.createForClass(RefreshToken) },
      { name: Otp.name, schema: SchemaFactory.createForClass(Otp) }
    ]),

  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule { }
