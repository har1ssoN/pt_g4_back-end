import { IsNumber, IsString } from 'class-validator';

export class CreateDisciplinaDto {
  @IsString()
  name: string;
  @IsNumber()
  professorId: number;
}
