import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginRequestBody } from './dto/loginRequestBody.dto';
import { UserToken } from './types/UserToken';
import { UserPayload } from './types/UserPayload';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService) {}

  async validateUser(email: string, password: string){
    const user = await this.userService.findOneByEmail(email);

    if (user){
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if(isPasswordValid){
        return {...user,
          password: undefined
        };
      }
    }
    return null;
  }

  async login(LoginRequestBody: LoginRequestBody): Promise<UserToken> {
    const user = await this.validateUser(LoginRequestBody.email, LoginRequestBody.password);

    if (!user) {
      throw new Error('Credenciais inválidas');
    }
    const payload : UserPayload = { sub: user.id, email: user.email };

    const jwtToken = this.jwtService.sign(payload, {expiresIn: '1d', secret: this.configService.get('JWT_SECRET')});

    return {access_token: jwtToken};
  }
}
