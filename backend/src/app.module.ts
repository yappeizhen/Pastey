import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnippetController } from './snippet/snippet.controller';
import { SnippetService } from './snippet/snippet.service';
import { PastyConfigModule } from './database/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Snippet } from './entities/snippet.entity';

@Module({
  imports: [PastyConfigModule, TypeOrmModule.forFeature([Snippet])],
  controllers: [AppController, SnippetController],
  providers: [AppService, SnippetService],
})
export class AppModule {}
