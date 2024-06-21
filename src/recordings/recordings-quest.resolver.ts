import { Quest } from '@/entities/quest.entity';
import { RecordFilter, Recording } from '@/entities/recording.entity';
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { RecordingsService } from './recordings.service';

@Resolver(() => Quest)
export class RecordingsQuestResolver {
  constructor(private readonly recordingsService: RecordingsService) {}

  @ResolveField(() => [Recording])
  recordings(
    @Parent() quest: Quest,
    @Args('filter') recordingFilter: RecordFilter,
  ) {
    return this.recordingsService.findRecordsOfQuest(quest.id, recordingFilter);
  }
}
