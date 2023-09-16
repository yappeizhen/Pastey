import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { Snippet } from '../entities/snippet.entity';

@Controller('snippets')
export class SnippetController {
  constructor(private readonly snippetService: SnippetService) {}

  @Get()
  async getActiveSnippets(): Promise<Snippet[]> {
    return await this.snippetService.getActiveSnippets();
  }

  @Get(':id')
  async getSnippetById(@Param('id') id: number): Promise<Snippet> {
    return await this.snippetService.getSnippetById(id);
  }

  @Post()
  async create(
    @Body('content') content: string,
    @Body('title') title: string,
    @Body('minsToExpiry') minsToExpiry: number,
  ): Promise<Snippet> {
    return await this.snippetService.createSnippet(
      content,
      title,
      minsToExpiry,
    );
  }
}
