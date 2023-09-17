import { Test, TestingModule } from '@nestjs/testing';
import { SnippetController } from './snippet.controller';
import { SnippetService } from './snippet.service';
import { PastyConfigModule } from '../database/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Snippet } from '../entities/snippet.entity';

describe('SnippetController', () => {
  let controller: SnippetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PastyConfigModule, TypeOrmModule.forFeature([Snippet])],
      controllers: [SnippetController],
      providers: [SnippetService],
    }).compile();

    controller = module.get<SnippetController>(SnippetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
