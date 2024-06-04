import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(CreateUserDto: CreateUserDto) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: CreateUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassord = await bcrypt.hash(CreateUserDto.password, 10);

    const user = await this.prismaService.user.create({
      data: {...CreateUserDto, password: hashedPassord}});

  }

  async findAll() {
    return await this.prismaService.user.findMany(
      {select: {id: true,
        name: true, 
        email: true, 
        department: true, 
        course: true, 
        profile_image: true,
        Avaliacoes: true,
        Comentarios: true,
        createdAt: true,
        updatedAt: true},
      }
    );
  }

  async findOne(id: number) {
    const isValidId = await this.prismaService.user.findUnique({
      where: { id },
    })

    if (!isValidId) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return await this.prismaService.user.findUnique({
      where: { id },
      select: {id: true,
        name: true, 
        email: true, 
        department: true, 
        course: true, 
        profile_image: true,
        Avaliacoes: true,
        Comentarios: true,
        createdAt: true,
        updatedAt: true},
    });
  }

  async findOneByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({where: { email },})
    
    if (!user) {
      return null;
    }

    return user;
  }


  async update(id: number, UpdateUserDto: UpdateUserDto) {
    const isValidId = await this.prismaService.user.findUnique({where: { id }, })
    if (!isValidId) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const hashedPassord = await bcrypt.hash(UpdateUserDto.password, 10);
    return await this.prismaService.user.update({
      where: { id },
      data: {...UpdateUserDto, password: hashedPassord},
      select: {id: true,
        name: true, 
        email: true, 
        department: true, 
        course: true, 
        profile_image: true,
        Avaliacoes: true,
        Comentarios: true,
        createdAt: true,
        updatedAt: true },
    })
  }

  async remove(id: number) {
    const isValidId = await this.prismaService.user.findUnique({where: { id }, })
    if (!isValidId) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return await this.prismaService.user.delete({
      where: { id },
      select: {id: true,
        name: true,
        email: true,
        department: true,
        course: true,
        profile_image: true,
        Avaliacoes: true,
        Comentarios: true,
        createdAt: true,
        updatedAt: true},
    });
  }
}
