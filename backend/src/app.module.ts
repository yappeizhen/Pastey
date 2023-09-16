import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnippetController } from './snippet/snippet.controller';
import { SnippetService } from './snippet/snippet.service';
import { Snippet } from './entities/snippet.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'user',
      password: 'password',
      database: 'pastebin',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Snippet]),
  ],
  controllers: [AppController, SnippetController],
  providers: [AppService, SnippetService],
})
export class AppModule {}
