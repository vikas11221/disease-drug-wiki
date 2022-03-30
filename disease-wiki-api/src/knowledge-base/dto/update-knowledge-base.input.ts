import { CreateKnowledgeBaseInput } from './create-knowledge-base.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateKnowledgeBaseInput extends PartialType(CreateKnowledgeBaseInput) {
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
