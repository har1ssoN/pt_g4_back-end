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
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { CurrentUser } from 'src/auth/decorators/CurrentUser.decorator';
import { UserPayload } from 'src/auth/types/UserPayload';

@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Post()
  async createAvaliacao(
    @Body(ValidationPipe) createAvaliacaoDto: CreateAvaliacaoDto, @CurrentUser() currentUser: UserPayload) {
      if (createAvaliacaoDto.userId !== currentUser.sub) {
        throw new UnauthorizedException('Não é possível fazer avaliações a partir de outro usuário');
      }
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
    @Body(ValidationPipe) updateAvaliacaoDto: UpdateAvaliacaoDto, @CurrentUser() currentUser: UserPayload
  ) {
    const avaliacao = await this.avaliacaoService.findAvaliacao(+id);
    if (avaliacao.userId !== currentUser.sub) {
      throw new UnauthorizedException('Só é possível editar suas avaliações.');
    }
    return await this.avaliacaoService.updateAvaliacao(+id, updateAvaliacaoDto);
  }

  @Delete(':id')
  async removeAvaliacao(@Param('id', ParseIntPipe) id: string, @CurrentUser() currentUser: UserPayload) {
    const avaliacao = await this.avaliacaoService.findAvaliacao(+id);
    if(avaliacao.userId !== currentUser.sub) {
      throw new UnauthorizedException('Só é possível excluir suas avaliações.');
    }
    return await this.avaliacaoService.removeAvaliacao(+id);
  }
}
