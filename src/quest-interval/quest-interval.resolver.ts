import { QuestInterval } from '@/entities/quest-interval.entity';
import { QuestStatus } from '@/entities/quest.entity';
import { Recording } from '@/entities/recording.entity';
import { QuestStatusService } from '@/quest-status/quest-status.service';
import { RecordingsService } from '@/recordings/recordings.service';
import { Float, Parent, ResolveField, Resolver } from '@nestjs/graphql';

@Resolver(() => QuestInterval)
export class QuestIntervalResolver {
  constructor(
    private readonly recordingsService: RecordingsService,
    private readonly questStatusService: QuestStatusService,
  ) {}

  @ResolveField(() => [Recording])
  records(@Parent() questInterval: QuestInterval) {
    return this.recordingsService.findRecordsOfQuest(questInterval.quest.id, {
      start: questInterval.startDate,
      end: questInterval.endDate,
    });
  }

  @ResolveField(() => Float)
  async value(@Parent() questInterval: QuestInterval) {
    return this.recordingsService.totalValuesOfQuest(questInterval.quest.id, {
      start: questInterval.startDate,
      end: questInterval.endDate,
    });
  }

  @ResolveField(() => QuestStatus)
  async status(@Parent() questInterval: QuestInterval) {
    return this.questStatusService.computeStatusForQuest({
      quest: questInterval.quest,
      interval: [questInterval.startDate, questInterval.endDate],
    });
  }
}
