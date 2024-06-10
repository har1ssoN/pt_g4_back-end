import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';


@Module({
  imports: [UserModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService],
})
export class AuthModule {}
