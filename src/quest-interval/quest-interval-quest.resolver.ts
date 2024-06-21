import { QuestInterval } from '@/entities/quest-interval.entity';
import { Quest } from '@/entities/quest.entity';
import { RepeatService } from '@/repeat/repeat.service';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

@Resolver(() => Quest)
export class QuestIntervalQuestResolver {
  constructor(private readonly repeatService: RepeatService) {}

  @ResolveField(() => QuestInterval, { nullable: true })
  async currentInterval(@Parent() quest: Quest) {
    return this.repeatService.getIntervalOnDate(quest, new Date());
  }
}
