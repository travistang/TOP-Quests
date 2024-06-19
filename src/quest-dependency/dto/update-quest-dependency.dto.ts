import {
  QuestDependency,
  QuestDependencyType,
} from '@/entities/quest-dependency.entity';
import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateQuestDependencyDto extends PartialType(
  OmitType(QuestDependency, ['id', 'parent', 'parent', 'dependents'] as const),
) {
  @Field(() => String)
  @IsUUID()
  dependentId: string;

  @Field(() => QuestDependencyType, { nullable: true })
  type: QuestDependencyType;

  @Field(() => Int, { nullable: true })
  numMinTasks: number;

  @Field({ nullable: true })
  blocking: boolean;
}
