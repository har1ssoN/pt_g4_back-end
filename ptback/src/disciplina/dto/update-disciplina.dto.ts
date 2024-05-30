import { PartialType } from '@nestjs/mapped-types';
import { CreateDisciplinaDto } from './create-disciplina.dto';
import { IsNumber } from 'class-validator';

export class UpdateDisciplinaDto extends PartialType(CreateDisciplinaDto) {
  @IsNumber()
  professorId?: number;
}
