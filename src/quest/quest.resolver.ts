import { QuestInterval } from '@/entities/quest-interval.entity';
import { RecordFilter, Recording } from '@/entities/recording.entity';
import { QuestStatusService } from '@/quest-status/quest-status.service';
import { CreateRecordingDto } from '@/recordings/dto/create-recording-dto';
import { RecordingsService } from '@/recordings/recordings.service';
import { RepeatService } from '@/repeat/repeat.service';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Quest, QuestStatus } from '../entities/quest.entity';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { QuestService } from './quest.service';

@Resolver(() => Quest)
export class QuestResolver {
  constructor(
    private readonly questService: QuestService,
    private readonly recordingsService: RecordingsService,
    private readonly repeatService: RepeatService,
    private readonly questStatusService: QuestStatusService,
  ) {}

  @Mutation(() => Quest)
  createQuest(@Args('createQuestDto') createQuestDto: CreateQuestDto) {
    return this.questService.create(createQuestDto);
  }

  @Query(() => [Quest], { name: 'quests' })
  findAll() {
    return this.questService.findAll();
  }

  @Query(() => Quest, { name: 'quest' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.questService.findOne(id);
  }

  @Mutation(() => Quest)
  updateQuest(@Args('updateQuestDto') updateQuestDto: UpdateQuestDto) {
    return this.questService.update(updateQuestDto);
  }

  @Mutation(() => Quest)
  removeQuest(@Args('id', { type: () => String }) id: string) {
    this.questService.remove(id);
    return { id } as Quest;
  }

  @ResolveField(() => [Recording])
  recordings(
    @Parent() quest: Quest,
    @Args('filter') recordingFilter: RecordFilter,
  ) {
    return this.questService.getRecordings(quest, recordingFilter);
  }

  @Mutation(() => Recording)
  async addRecord(@Args('recording') recording: CreateRecordingDto) {
    const quest = await this.questService.findOne(recording.questId);
    if (!quest) {
      throw new Error('Quest not found');
    }
    return this.recordingsService.createRecording(recording, quest);
  }

  @ResolveField(() => QuestInterval, { nullable: true })
  async currentInterval(@Parent() quest: Quest) {
    const interval = this.repeatService.getIntervalOnDate(quest, new Date());
    if (!interval) {
      return null;
    }
    const questInterval = new QuestInterval();
    questInterval.startDate = interval[0];
    questInterval.endDate = interval[1];
    questInterval.quest = quest;

    return questInterval;
  }

  @ResolveField(() => QuestStatus)
  async status(@Parent() quest: Quest) {
    const interval = await this.currentInterval(quest);
    const achievedValue = await this.questService.getAchievedValue(quest, {
      start: interval.startDate,
      end: interval.endDate,
    });
    return this.questStatusService.computeStatusForQuest({
      achievedValue,
      target: quest.target,
      startDate: quest.startDate,
      dueDate: quest.dueDate,
    });
  }
}
