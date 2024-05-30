import { Injectable } from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfessorService {
  constructor(private readonly prisma: PrismaService) {}

  async createProfessor(createProfessorDto: CreateProfessorDto) {
    const professor = await this.prisma.professor.create({
      data: createProfessorDto,
    });
    return professor;
  }

  async findAll() {
    return await this.prisma.professor.findMany();
  }

  async findProfessor(id: number) {
    return await this.prisma.professor.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateProfessor(id: number, updateProfessorDto: UpdateProfessorDto) {
    return await this.prisma.professor.update({
      where: {
        id: id,
      },
      data: updateProfessorDto,
    });
  }

  async removeProfessor(id: number) {
    return await this.prisma.professor.delete({
      where: {
        id: id,
      },
    });
  }
}
