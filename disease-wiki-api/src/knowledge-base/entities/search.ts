import { KnowledgeBase } from './knowledge-base.entity';

export interface WikiSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: KnowledgeBase;
    }>;
  };
}
