import { Injectable } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ComentarioService {
  constructor(private readonly prisma: PrismaService) {}

  async createComentario(createComentarioDto: CreateComentarioDto) {
    const comentario = await this.prisma.comentario.create({
      data: createComentarioDto,
    });
    return comentario;
  }

  async findAll() {
    return await this.prisma.comentario.findMany();
  }

  async findComentario(id: number) {
    return await this.prisma.comentario.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateComentario(id: number, updateComentarioDto: UpdateComentarioDto) {
    return await this.prisma.comentario.update({
      where: {
        id: id,
      },
      data: updateComentarioDto,
    });
  }

  async removeComentario(id: number) {
    return await this.prisma.comentario.delete({
      where: {
        id: id,
      },
    });
  }
}
