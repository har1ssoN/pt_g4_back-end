import { IsNumber, IsString } from 'class-validator';

export class CreateProfessorDto {
  @IsString()
  name: string;
  @IsString()
  department: string;
  @IsNumber()
  disciplinaId: number;
}
