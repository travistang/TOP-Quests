import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { CreateQuestDto } from './create-quest.dto';

@InputType()
export class UpdateQuestDto extends PartialType(CreateQuestDto) {
  @Field(() => String)
  @IsUUID()
  id: string;
}
