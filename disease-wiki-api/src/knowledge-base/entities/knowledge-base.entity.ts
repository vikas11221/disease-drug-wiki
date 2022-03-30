import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class KnowledgeBase {
  @Field(() => String, { description: 'Drug database identifier' })
  id: string;

  @Field(() => String, { description: 'Name of the drug' })
  name: string;

  @Field(() => [String], { description: 'List of diseases' })
  diseases: string[];

  @Field(() => String, { description: 'Description of the drug' })
  description: string;

  @Field(() => String, { description: 'Released date of the drug' })
  released: string;
}
