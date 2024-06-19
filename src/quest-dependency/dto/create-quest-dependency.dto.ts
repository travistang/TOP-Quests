import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class CreateQuestDependencyDto {
  @Field()
  @IsUUID()
  dependentId: string;

  @Field()
  @IsUUID()
  parentId: string;
}
