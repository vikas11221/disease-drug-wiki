import { Field, InputType,  } from '@nestjs/graphql';
import { IsNotEmpty, IsDateString, IsUUID } from 'class-validator';

@InputType()
export class CreateKnowledgeBaseInput {
  @Field(() => String, { description: 'Name of the drug' })
  @IsNotEmpty()
  name: string;

  @Field(() => [String], { description: 'List of diseases' })
  @IsNotEmpty()
  diseases: string[];

  @Field(() => String, { description: 'Description of the drug' })
  @IsNotEmpty()
  description: string;

  @Field(() => String, { description: 'Released date of the drug' })
  @IsNotEmpty()
  @IsDateString()
  released: string;
}
