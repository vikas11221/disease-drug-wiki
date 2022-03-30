import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class RemoveKnowledgeBase {
  @Field(() => Number, { description: 'Total matched docs' })
  total: number;

  @Field(() => Number, { description: 'Deleted docs' })
  deleted: number;
}
