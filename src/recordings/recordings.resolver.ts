import { Quest } from '@/entities/quest.entity';
import { Recording } from '@/entities/recording.entity';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecordingDto } from './dto/create-recording-dto';
import { UpdateRecordingDto } from './dto/update-recording-dto';
import { RecordingsService } from './recordings.service';

@Resolver(() => Recording)
export class RecordingResolver {
  constructor(
    private readonly recordingsService: RecordingsService,
    @InjectRepository(Quest)
    private readonly questRepository: Repository<Quest>,
  ) {}

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

  @Mutation(() => Recording)
  async addRecord(@Args('recording') recording: CreateRecordingDto) {
    const quest = await this.questRepository.findOneBy({
      id: recording.questId,
    });
    if (!quest) {
      throw new Error('Quest not found');
    }
    return this.recordingsService.createRecording(recording);
  }
}
