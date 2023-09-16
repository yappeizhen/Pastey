import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    minsToExpiry: number,
  ): Promise<Snippet> {
    const snippet = new Snippet();
    snippet.content = content;
    snippet.title = title;
    snippet.minsToExpiry = minsToExpiry ?? null;
    return await this.snippetRepository.save(snippet);
  }

  async getActiveSnippets(): Promise<Snippet[]> {
    const currentDate = new Date();
    const snippets = await this.snippetRepository
      .createQueryBuilder('snippet')
      .where(
        `(snippet.dateCreated + snippet.minsToExpiry * INTERVAL '1 minute') > :currentDate`,
        { currentDate: currentDate.toISOString() },
      )
      .getMany();
    return snippets;
  }
}
