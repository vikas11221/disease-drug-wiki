
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CreateKnowledgeBase {
  @Field(() => String, { description: 'ID of the doc' })
  id: string;

  @Field(() => Number, { description: 'Total' })
  total: number;

  @Field(() => Number, { description: 'Successful' })
  successful: number;

  @Field(() => Number, { description: 'Failed' })
  failed: number;
  
}
