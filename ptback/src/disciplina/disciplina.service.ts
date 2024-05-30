import { Injectable } from '@nestjs/common';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DisciplinaService {
  constructor(private readonly prisma: PrismaService) {}

  async createDisciplina(createDisciplinaDto: CreateDisciplinaDto) {
    const disciplina = await this.prisma.disciplina.create({
      data: createDisciplinaDto,
    });
    return disciplina;
  }

  async findAll() {
    return await this.prisma.disciplina.findMany();
  }

  async findDisciplina(id: number) {
    return await this.prisma.disciplina.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateDisciplina(id: number, updateDisciplinaDto: UpdateDisciplinaDto) {
    return await this.prisma.disciplina.update({
      where: {
        id: id,
      },
      data: updateDisciplinaDto,
    });
  }

  async removeDisciplina(id: number) {
    return await this.prisma.disciplina.delete({
      where: {
        id: id,
      },
    });
  }
}
