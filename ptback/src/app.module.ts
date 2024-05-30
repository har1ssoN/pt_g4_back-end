import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { PrismaModule } from './prisma/prisma.module';
import { ComentarioModule } from './comentario/comentario.module';
import { UserModule } from './user/user.module';
import { ProfessorModule } from './professor/professor.module';

@Module({
  imports: [
    AvaliacaoModule,
    PrismaModule,
    ComentarioModule,
    UserModule,
    ProfessorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
