import { IsNumber, IsString } from 'class-validator';

export class CreateAvaliacaoDto {
  @IsString()
  conteudo: string;
  @IsNumber()
  userId: number;
  @IsNumber()
  professorId: number;
  @IsNumber()
  disciplinaId: number;
}
