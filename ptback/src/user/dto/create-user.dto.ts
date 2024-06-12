import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  IsNotEmpty,
} from 'class-validator';
import { UserEntity } from '../entities/user.entity';
import { PartialType } from '@nestjs/mapped-types';
export class CreateUserDto extends PartialType(UserEntity) {
  @IsString()
  @IsNotEmpty({ message: 'O campo nome não pode estar vazio.' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'O campo email não pode estar vazio.' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'A senha deve conter pelo menos 8 caracteres.' })
  @IsNotEmpty({ message: 'O campo senha não pode estar vazio.' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo departamento não pode estar vazio.' })
  department: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo curso não pode estar vazio.' })
  course: string;

  @IsOptional()
  profile_image?: Buffer;
}
