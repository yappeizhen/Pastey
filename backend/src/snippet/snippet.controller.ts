import { Body, Controller, Get, Post } from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { Snippet } from '../entities/snippet.entity';

@Controller('snippets')
export class SnippetController {
  constructor(private readonly snippetService: SnippetService) {}

  @Get()
  async getActiveSnippets(): Promise<Snippet[]> {
    return await this.snippetService.getActiveSnippets();
  }

  @Post()
  async create(
    @Body('content') content: string,
    @Body('title') title: string,
    @Body('expiryTime') expiryTime?: string,
  ): Promise<Snippet> {
    return await this.snippetService.createSnippet(
      content,
      title,
      expiryTime ? new Date(expiryTime) : null,
    );
  }
}
