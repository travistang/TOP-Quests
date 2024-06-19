import { Quest } from '@/entities/quest.entity';
import { Recording } from '@/entities/recording.entity';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UpdateRecordingDto } from './dto/update-recording-dto';
import { RecordingsService } from './recordings.service';

@Resolver(() => Recording)
export class RecordingResolver {
  constructor(private readonly recordingsService: RecordingsService) {}

  @ResolveField(() => Quest, { name: 'quest' })
  quest(@Parent() recording: Recording) {
    return this.recordingsService.getQuestOfRecording(recording);
  }

  @Mutation(() => Recording)
  updateRecord(
    @Args('updateRecordingDto') updateRecordingDto: UpdateRecordingDto,
  ) {
    return this.recordingsService.update(updateRecordingDto);
  }
}
