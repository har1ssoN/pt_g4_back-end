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
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Post()
  async createAvaliacao(
    @Body(ValidationPipe) createAvaliacaoDto: CreateAvaliacaoDto,
  ) {
    return await this.avaliacaoService.createAvaliacao(createAvaliacaoDto);
  }

  @Get()
  async findAll() {
    return await this.avaliacaoService.findAll();
  }

  @Get(':id')
  async findAvaliacao(@Param('id', ParseIntPipe) id: string) {
    return await this.avaliacaoService.findAvaliacao(+id);
  }

  @Patch(':id')
  async updateAvaliacao(
    @Param('id', ParseIntPipe) id: string,
    @Body(ValidationPipe) updateAvaliacaoDto: UpdateAvaliacaoDto,
  ) {
    return await this.avaliacaoService.updateAvaliacao(+id, updateAvaliacaoDto);
  }

  @Delete(':id')
  async removeAvaliacao(@Param('id', ParseIntPipe) id: string) {
    return await this.avaliacaoService.removeAvaliacao(+id);
  }
}
