import { Injectable } from '@nestjs/common';
import { CreateKnowledgeBaseInput, UpdateKnowledgeBaseInput } from './dto';
import { WikiSearchResult } from './entities/search';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import * as seedData from './seed/dataset.json';
import * as _ from 'lodash';
import * as uuid from 'uuidv4';

@Injectable()
export class KnowledgeBaseService {
  readonly wikiIndex = 'drug-wiki';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async find(searchTerm) {
    const body = await this.elasticsearchService.search<WikiSearchResult>({
      index: this.wikiIndex,
      body: {
        query: {
          bool: {
            should: [
              {
                match: {
                  name: searchTerm,
                },
              },
              {
                match: {
                  diseases: searchTerm,
                },
              },
            ],
          },
        },
      },
    });
    return body.hits.hits.map((data) => data._source);
  }

  async create(createKnowledgeBaseInput: CreateKnowledgeBaseInput) {
    return this.elasticsearchService.create({
      index: this.wikiIndex,
      id: uuid.uuid(),
      body: { id: uuid.uuid(), ...createKnowledgeBaseInput },
    }).then(result => {
      return {
        id: result._id,
        successful: result._shards.successful,
        total: result._shards.successful,
        failed: result._shards.failed
      }
    });
  }

  async update(id: string, updateKnowledgeBaseInput: UpdateKnowledgeBaseInput) {
    console.log(id, updateKnowledgeBaseInput);

    let script = '';

    for (const key in _.pickBy(updateKnowledgeBaseInput, _.identity)) {
      if (Object.prototype.hasOwnProperty.call(updateKnowledgeBaseInput, key)) {
        script += `ctx._source.${key} = '${updateKnowledgeBaseInput[key]}';`;
      }
    }

    return this.elasticsearchService.updateByQuery({
      index: this.wikiIndex,
      body: {
        query: {
          match: {
            id: id,
          },
        },
        script,
      },
    });
  }

  remove(id: string): Promise<any> {
    return this.elasticsearchService.deleteByQuery({
      index: this.wikiIndex,
      body: {
        query: {
          match: {
            id: id,
          },
        },
      },
    });
  }

  isIndexExists() {
    return this.elasticsearchService.indices.exists({
      index: this.wikiIndex,
    });
  }

  createIndex() {
    return this.elasticsearchService.indices.create({
      index: this.wikiIndex,
      body: {
        mappings: {
          properties: {
            id: { type: 'keyword' },
            diseases: { type: 'text' },
            description: { type: 'text' },
            name: { type: 'text' },
            released: {
              type: 'date',
              format: 'yyyy-MM-dd',
            },
          },
        },
      },
    });
  }

  seed() {
    return this.elasticsearchService.bulk({
      index: this.wikiIndex,
      body: seedData.drugs,
    });
  }
}
