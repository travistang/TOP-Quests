import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { CreateQuestDto } from './create-quest.dto';
import { QuestService } from '../quest.service';
import { QuestStatus } from '@/entities/quest.entity';

@InputType()
export class UpdateQuestDto extends PartialType(CreateQuestDto) {
  @Field(() => String)
  @IsUUID()
  id: string;

  @Field(() => QuestStatus, { nullable: true })
  status?: QuestStatus;

  @Field(() => String, { nullable: true })
  statusRemark?: string;
}
