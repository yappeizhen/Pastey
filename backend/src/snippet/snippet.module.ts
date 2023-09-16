import { Module } from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { SnippetController } from './snippet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Snippet } from '../entities/snippet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Snippet])],
  providers: [SnippetService],
  controllers: [SnippetController],
})
export class SnippetModule {}
