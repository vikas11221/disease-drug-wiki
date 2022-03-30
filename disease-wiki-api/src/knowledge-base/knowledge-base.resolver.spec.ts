import { Test, TestingModule } from '@nestjs/testing';
import { KnowledgeBaseResolver } from './knowledge-base.resolver';
import { KnowledgeBaseService } from './knowledge-base.service';

describe('KnowledgeBaseResolver', () => {
  let resolver: KnowledgeBaseResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KnowledgeBaseResolver, KnowledgeBaseService],
    }).compile();

    resolver = module.get<KnowledgeBaseResolver>(KnowledgeBaseResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
