import { IsNumber, IsString } from 'class-validator';

export class CreateComentarioDto {
  @IsString()
  conteudo: string;
  @IsNumber()
  userId: number;
  @IsNumber()
  avaliacaoId: number;
}
