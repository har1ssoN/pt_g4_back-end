import { Injectable } from '@nestjs/common';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AvaliacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async createAvaliacao(createAvaliacaoDto: CreateAvaliacaoDto) {
    const avaliacao = await this.prisma.avaliacao.create({
      data: createAvaliacaoDto,
    });
    return avaliacao;
  }

  async findAll() {
    return await this.prisma.avaliacao.findMany();
  }

  async findAvaliacao(id: number) {
    return await this.prisma.avaliacao.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateAvaliacao(id: number, updateAvaliacaoDto: UpdateAvaliacaoDto) {
    return await this.prisma.avaliacao.update({
      where: {
        id: id,
      },
      data: updateAvaliacaoDto,
    });
  }

  async removeAvaliacao(id: number) {
    return await this.prisma.avaliacao.delete({
      where: {
        id: id,
      },
    });
  }
}
