import { PartialType } from '@nestjs/mapped-types';
import { CreateAvaliacaoDto } from './create-avaliacao.dto';
import { IsString } from 'class-validator';

export class UpdateAvaliacaoDto extends PartialType(CreateAvaliacaoDto) {
  @IsString()
  conteudo: string;
}
