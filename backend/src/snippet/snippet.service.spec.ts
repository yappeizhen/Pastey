import { Test, TestingModule } from '@nestjs/testing';
import { SnippetService } from './snippet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Snippet } from '../entities/snippet.entity';
import { PastyConfigModule } from '../database/config.module';

describe('SnippetService', () => {
  let service: SnippetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PastyConfigModule, TypeOrmModule.forFeature([Snippet])],
      providers: [SnippetService],
    }).compile();

    service = module.get<SnippetService>(SnippetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
