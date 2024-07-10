import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/core/models/user.schemas';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from 'src/core/models/refreshtoken.schema';
import { Otp } from 'src/core/models/otp.schema';
import { Doctor } from 'src/core/models/doctor.schema';

const databaseModule = MongooseModule.forFeature([
  {
    name: User.name, schema: SchemaFactory.createForClass(User), discriminators: [
      { name: Doctor.name, schema: SchemaFactory.createForClass(Doctor) }
    ]
  },
  { name: RefreshToken.name, schema: SchemaFactory.createForClass(RefreshToken) },
  { name: Otp.name, schema: SchemaFactory.createForClass(Otp) }
])

@Module({
  imports: [
    databaseModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [databaseModule, JwtService]
})
export class AuthModule { }
