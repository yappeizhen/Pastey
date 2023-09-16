import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Snippet } from '../entities/snippet.entity';

@Injectable()
export class SnippetService {
  constructor(
    @InjectRepository(Snippet)
    private readonly snippetRepository: Repository<Snippet>,
  ) {}

  async createSnippet(
    content: string,
    title: string,
    expiry?: Date,
  ): Promise<Snippet> {
    const snippet = new Snippet();
    snippet.content = content;
    snippet.title = title;
    snippet.expiry = expiry || null;
    return await this.snippetRepository.save(snippet);
  }

  async getActiveSnippets(): Promise<Snippet[]> {
    const now = new Date();
    return await this.snippetRepository.find({
      where: {
        expiry: MoreThan(now),
      },
    });
  }
}
