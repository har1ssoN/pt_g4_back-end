import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { Public } from 'src/auth/decorators/isPublic.decorator';
import { CurrentUser } from 'src/auth/decorators/CurrentUser.decorator';
import { UserPayload } from 'src/auth/types/UserPayload';

@Controller('comentario')
export class ComentarioController {
  constructor(private readonly comentarioService: ComentarioService) {}

  @Post()
  async createComentario(
    @Body(ValidationPipe) createComentarioDto: CreateComentarioDto,
  ) {
    return await this.comentarioService.createComentario(createComentarioDto);
  }

  @Public()
  @Get()
  async findAll() {
    return await this.comentarioService.findAll();
  }
  @Public()
  @Get(':id')
  async findComentario(@Param('id', ParseIntPipe) id: string) {
    return await this.comentarioService.findComentario(+id);
  }

  @Patch(':id')
  async updateComentario(
    @Param('id', ParseIntPipe) id: string,
    @Body(ValidationPipe) updateComentarioDto: UpdateComentarioDto, @CurrentUser() currentUser: UserPayload
  ) {
    const comment = await this.comentarioService.findComentario(+id);
    console.log(comment.userId, currentUser.sub);
    if (comment.userId !== currentUser.sub) {
      throw new UnauthorizedException('Só é possível editar seus comentários.');
    }
    return await this.comentarioService.updateComentario(
      +id,
      updateComentarioDto,
    );
  }

  @Delete(':id')
  async removeComentario(@Param('id', ParseIntPipe) id: string, @CurrentUser() currentUser: UserPayload) {
    const comment = await this.comentarioService.findComentario(+id);
    if(comment.userId !== currentUser.sub) {
      throw new UnauthorizedException('Só é possível excluir seus comentários.');
    }
    return this.comentarioService.removeComentario(+id);
  }
}
