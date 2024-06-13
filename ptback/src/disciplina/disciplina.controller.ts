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
import { DisciplinaService } from './disciplina.service';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { Public } from 'src/auth/decorators/isPublic.decorator';

@Controller('disciplina')
export class DisciplinaController {
  constructor(private readonly disciplinaService: DisciplinaService) {}

  @Post()
  async createDisciplina(
    @Body(ValidationPipe) createDisciplinaDto: CreateDisciplinaDto,
  ) {
    return await this.disciplinaService.createDisciplina(createDisciplinaDto);
  }

  @Public()
  @Get()
  async findAll() {
    return await this.disciplinaService.findAll();
  }
  @Public()
  @Get(':id')
  async findDisciplina(@Param('id', ParseIntPipe) id: string) {
    return await this.disciplinaService.findDisciplina(+id);
  }

  @Patch(':id')
  async updateDisciplina(
    @Param('id', ParseIntPipe) id: string,
    @Body(ValidationPipe) updateDisciplinaDto: UpdateDisciplinaDto,
  ) {
    return await this.disciplinaService.updateDisciplina(
      +id,
      updateDisciplinaDto,
    );
  }

  @Delete(':id')
  async removeDisciplina(@Param('id', ParseIntPipe) id: string) {
    return await this.disciplinaService.removeDisciplina(+id);
  }
}
