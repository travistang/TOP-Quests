import { Quest, QuestStatus } from '@/entities/quest.entity';
import { RepeatService } from '@/repeat/repeat.service';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { QuestStatusService } from './quest-status.service';

@Resolver(() => Quest)
export class QuestStatusQuestResolver {
  constructor(
    private readonly repeatService: RepeatService,
    private readonly questStatusService: QuestStatusService,
  ) {}

  @ResolveField(() => QuestStatus)
  async status(@Parent() quest: Quest) {
    const interval = await this.repeatService.getIntervalOnDate(
      quest,
      new Date(),
    );
    return this.questStatusService.computeStatusForQuest({
      quest,
      interval,
    });
  }
}
