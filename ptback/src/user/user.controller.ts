import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/decorators/isPublic.decorator';
import { UserPayload } from 'src/auth/types/UserPayload';
import { CurrentUser } from 'src/auth/decorators/CurrentUser.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Public()
  @Post()
  async create(@Body() userData: CreateUserDto) {
    return await this.userService.create(userData);
  }
  @Public()
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Public()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto, @CurrentUser() currentUser: UserPayload){
    const userId = +id;
    console.log('Tipo de id:', typeof userId, 'Valor de id:', userId);
    console.log('Tipo de currentUser.sub:', typeof currentUser.sub, 'Valor de currentUser.sub:', currentUser.sub);

    if(userId !== currentUser.sub) {
      console.log(id, currentUser.sub)
      throw new UnauthorizedException('Não é possível editar outros usuários');
    }
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @CurrentUser() currentUser: UserPayload) {
    const userId = +id;
    if( userId !== currentUser.sub) {
      throw new UnauthorizedException('Não é possível excluir outros usuários');
    }
    return await this.userService.remove(+id);
  }
}
