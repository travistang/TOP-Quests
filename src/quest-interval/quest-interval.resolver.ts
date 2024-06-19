import { QuestInterval } from '@/entities/quest-interval.entity';
import { QuestStatus } from '@/entities/quest.entity';
import { Recording } from '@/entities/recording.entity';
import { QuestStatusService } from '@/quest-status/quest-status.service';
import { QuestService } from '@/quest/quest.service';
import { Float, Parent, ResolveField, Resolver } from '@nestjs/graphql';

@Resolver(() => QuestInterval)
export class QuestIntervalResolver {
  constructor(
    private readonly questService: QuestService,
    private readonly questStatusService: QuestStatusService,
  ) {}

  @ResolveField(() => [Recording])
  records(@Parent() questInterval: QuestInterval) {
    return this.questService.getRecordings(questInterval.quest, {
      start: questInterval.startDate,
      end: questInterval.endDate,
    });
  }

  @ResolveField(() => Float)
  async value(@Parent() questInterval: QuestInterval) {
    return this.questService.getAchievedValue(questInterval.quest, {
      start: questInterval.startDate,
      end: questInterval.endDate,
    });
  }

  @ResolveField(() => QuestStatus)
  async status(@Parent() questInterval: QuestInterval) {
    const achievedValue = await this.value(questInterval);
    return this.questStatusService.computeStatusForQuest({
      startDate: questInterval.startDate,
      dueDate: questInterval.endDate,
      target: questInterval.quest.target,
      achievedValue,
    });
  }
}
