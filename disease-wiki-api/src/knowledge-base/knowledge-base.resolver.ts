import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { KnowledgeBaseService } from './knowledge-base.service';
import { KnowledgeBase } from './entities/knowledge-base.entity';
import { UpdateKnowledgeBase } from './entities/update.entity';
import { RemoveKnowledgeBase } from './entities/remove.entity';
import { CreateKnowledgeBase } from './entities/create.entity';
import { CreateKnowledgeBaseInput, UpdateKnowledgeBaseInput } from './dto';

@Resolver(() => KnowledgeBase)
export class KnowledgeBaseResolver {
  constructor(private readonly knowledgeBaseService: KnowledgeBaseService) {}

  @Query(() => [KnowledgeBase], { name: 'knowledgeBase', nullable: true })
  find(@Args('searchText', { nullable: true }) searchText: string) {
    return this.knowledgeBaseService.find(searchText);
  }

  @Mutation(returns => CreateKnowledgeBase)
  createKnowledgeBase(
    @Args('createKnowledgeBaseInput')
    createKnowledgeBaseInput: CreateKnowledgeBaseInput,
  ) {
    return this.knowledgeBaseService.create(createKnowledgeBaseInput);
  }

  @Mutation(returns => UpdateKnowledgeBase)
  updateKnowledgeBase(
    @Args('updateKnowledgeBaseInput')
    updateKnowledgeBaseInput: UpdateKnowledgeBaseInput,
  ) {
    return this.knowledgeBaseService.update(
      updateKnowledgeBaseInput.id,
      updateKnowledgeBaseInput,
    );
  }

  @Mutation(returns => RemoveKnowledgeBase)
  removeKnowledgeBase(@Args('id', { type: () => String }) id: string) {
    return this.knowledgeBaseService.remove(id);
  }
}
