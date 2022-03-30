import { Module, OnModuleInit } from '@nestjs/common';

import { KnowledgeBaseService } from './knowledge-base.service';
import { KnowledgeBaseResolver } from './knowledge-base.resolver';
import { ElasticModule } from '../shared/elastic/elastic.module';

@Module({
  providers: [KnowledgeBaseResolver, KnowledgeBaseService],
  imports: [ElasticModule],
})
export class KnowledgeBaseModule implements OnModuleInit {
  constructor(private readonly knowledgeBaseService: KnowledgeBaseService) {}
  public async onModuleInit() {
    const isExists = await this.knowledgeBaseService.isIndexExists();
    if (!isExists) {
      await this.knowledgeBaseService.createIndex()
      await this.knowledgeBaseService.seed();
    }
  }
}
