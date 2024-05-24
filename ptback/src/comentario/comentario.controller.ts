import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

@Controller('comentario')
export class ComentarioController {
  constructor(private readonly comentarioService: ComentarioService) {}

  @Post()
  async createComentario(@Body() createComentarioDto: CreateComentarioDto) {
    return await this.comentarioService.createComentario(createComentarioDto);
  }

  @Get()
  async findAll() {
    return await this.comentarioService.findAll();
  }

  @Get(':id')
  async findComentario(@Param('id') id: string) {
    return await this.comentarioService.findComentario(+id);
  }

  @Patch(':id')
  async updateComentario(
    @Param('id') id: string,
    @Body() updateComentarioDto: UpdateComentarioDto,
  ) {
    return await this.comentarioService.updateComentario(
      +id,
      updateComentarioDto,
    );
  }

  @Delete(':id')
  removeComentario(@Param('id') id: string) {
    return this.comentarioService.removeComentario(+id);
  }
}
