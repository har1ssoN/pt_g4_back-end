import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { PrismaModule } from './prisma/prisma.module';
import { ComentarioModule } from './comentario/comentario.module';
import { UserModule } from './user/user.module';
import { ProfessorModule } from './professor/professor.module';
import { DisciplinaModule } from './disciplina/disciplina.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './auth/guards/auth.guard';

@Module({
  imports: [
    AvaliacaoModule,
    PrismaModule,
    ComentarioModule,
    UserModule,
    ProfessorModule,
    DisciplinaModule,
    AuthModule,
    JwtModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
