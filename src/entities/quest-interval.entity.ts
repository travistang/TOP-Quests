import { Field, ObjectType } from '@nestjs/graphql';
import { Quest } from './quest.entity';
import { Recording } from './recording.entity';

@ObjectType()
export class QuestInterval {
  @Field(() => Quest)
  quest: Quest;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;

  @Field(() => [Recording])
  records: Recording[];
}
