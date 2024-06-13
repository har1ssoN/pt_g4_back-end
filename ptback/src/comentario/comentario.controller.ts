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
} from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { Public } from 'src/auth/decorators/isPublic.decorator';

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
    @Body(ValidationPipe) updateComentarioDto: UpdateComentarioDto,
  ) {
    return await this.comentarioService.updateComentario(
      +id,
      updateComentarioDto,
    );
  }

  @Delete(':id')
  removeComentario(@Param('id', ParseIntPipe) id: string) {
    return this.comentarioService.removeComentario(+id);
  }
}
