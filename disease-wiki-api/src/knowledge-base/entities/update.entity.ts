import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UpdateKnowledgeBase {
  @Field(() => Number, { description: 'Total matched docs' })
  total: number;

  @Field(() => Number, { description: 'Deleted docs' })
  updated: number;
}
