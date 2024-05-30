import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessorDto } from './create-professor.dto';
import { IsNumber } from 'class-validator';

export class UpdateProfessorDto extends PartialType(CreateProfessorDto) {
  @IsNumber()
  discplinaId?: number;
}
