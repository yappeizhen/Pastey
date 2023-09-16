import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { Snippet } from '../entities/snippet.entity';
import { SortTypes } from '../constants/sort';

@Controller('snippets')
export class SnippetController {
  constructor(private readonly snippetService: SnippetService) {}

  @Get()
  async getActiveSnippets(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sortBy') sortBy: SortTypes,
    @Query('order') order: 'ASC' | 'DESC',
  ): Promise<{ snippets: Snippet[]; numPages: number }> {
    return await this.snippetService.getActiveSnippets({
      page,
      limit,
      sortBy,
      order,
    });
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
