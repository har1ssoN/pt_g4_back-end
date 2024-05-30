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
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Post()
  async createProfessor(
    @Body(ValidationPipe) createProfessorDto: CreateProfessorDto,
  ) {
    return await this.professorService.createProfessor(createProfessorDto);
  }

  @Get()
  async findAll() {
    return await this.professorService.findAll();
  }

  @Get(':id')
  async findProfessor(@Param('id', ParseIntPipe) id: string) {
    return await this.professorService.findProfessor(+id);
  }

  @Patch(':id')
  async updateProfessor(
    @Param('id') id: string,
    @Body(ValidationPipe) updateProfessorDto: UpdateProfessorDto,
  ) {
    return this.professorService.updateProfessor(+id, updateProfessorDto);
  }

  @Delete(':id')
  async removeProfessor(@Param('id', ParseIntPipe) id: string) {
    return await this.professorService.removeProfessor(+id);
  }
}
