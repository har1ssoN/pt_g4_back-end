import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { PrismaModule } from './prisma/prisma.module';
import { ComentarioModule } from './comentario/comentario.module';

@Module({
  imports: [AvaliacaoModule, PrismaModule, ComentarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
