import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { CloudinaryModule } from '@app/common';

@Module({
  imports: [AuthModule, CloudinaryModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
