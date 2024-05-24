import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Post()
  async createAvaliacao(@Body() createAvaliacaoDto: CreateAvaliacaoDto) {
    return await this.avaliacaoService.createAvaliacao(createAvaliacaoDto);
  }

  @Get()
  async findAll() {
    return await this.avaliacaoService.findAll();
  }

  @Get(':id')
  async findAvaliacao(@Param('id') id: string) {
    return await this.avaliacaoService.findAvaliacao(+id);
  }

  @Patch(':id')
  async updateAvaliacao(
    @Param('id') id: string,
    @Body() updateAvaliacaoDto: UpdateAvaliacaoDto,
  ) {
    return await this.avaliacaoService.updateAvaliacao(+id, updateAvaliacaoDto);
  }

  @Delete(':id')
  async removeAvaliacao(@Param('id') id: string) {
    return await this.avaliacaoService.removeAvaliacao(+id);
  }
}
