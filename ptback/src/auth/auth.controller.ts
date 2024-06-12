import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestBody } from './dto/loginRequestBody.dto';
import { AuthGuard } from './guards/auth.guard';
import { Public } from './decorators/isPublic.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginRequestBody: LoginRequestBody) {
    return await this.authService.login(loginRequestBody);
  }
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
