import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Snippet } from '../entities/snippet.entity';
import { SortTypes } from '../constants/sort';

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
    snippet.minsToExpiry = minsToExpiry;
    return await this.snippetRepository.save(snippet);
  }

  getQueryWithExpiry = (): SelectQueryBuilder<Snippet> => {
    const currentDate = new Date();
    return this.snippetRepository
      .createQueryBuilder('snippet')
      .where(
        `(snippet.dateCreated + (snippet.minsToExpiry * INTERVAL '1 minute')) > :currentDate`,
        { currentDate: currentDate.toISOString() },
      );
  };

  async getSnippetById(id: number): Promise<Snippet> {
    const snippet = await this.getQueryWithExpiry().andWhere({ id }).getOne();
    if (!snippet) return null;
    // Increment views
    const updateSnippet = { ...snippet, views: snippet.views + 1 };
    this.snippetRepository.save(updateSnippet);
    return updateSnippet;
  }

  async getActiveSnippets({
    page,
    limit,
    sortBy,
    order,
  }: {
    page: number;
    limit: number;
    sortBy: SortTypes;
    order: 'ASC' | 'DESC';
  }): Promise<{ snippets: Snippet[]; numPages: number }> {
    const [snippets, numPages] = await this.getQueryWithExpiry()
      .addOrderBy(sortBy, order)
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    return { snippets, numPages };
  }
}
