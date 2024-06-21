import { QuestStatus } from '@/entities/quest.entity';
import { RecordingsService } from '@/recordings/recordings.service';
import { Injectable } from '@nestjs/common';
import { isFuture } from 'date-fns';
import { ComputeQuestStatusParams, QuestStatusCriteria } from './types';

@Injectable()
export class QuestStatusService {
  constructor(private readonly recordingService: RecordingsService) {}

  async checkExpired(params: ComputeQuestStatusParams) {
    if (!params.quest.dueDate) return null;
    return !isFuture(params.quest.dueDate) ? QuestStatus.FAILED : null;
  }

  async checkStartDate(params: ComputeQuestStatusParams) {
    return isFuture(params.quest.startDate) ? QuestStatus.NOT_STARTED : null;
  }

  async checkMarkCompleted(params: ComputeQuestStatusParams) {
    return params.quest.markCompleted ? QuestStatus.COMPLETED : null;
  }

  async checkValueAchieved(params: ComputeQuestStatusParams) {
    const recordings = await this.recordingService.findRecordsOfQuest(
      params.quest.id,
      {
        start: params.interval?.[0],
        end: params.interval?.[1],
      },
    );
    const achievedValue = recordings.reduce(
      (acc, record) => acc + record.value,
      0,
    );
    return params.quest.target <= achievedValue ? QuestStatus.COMPLETED : null;
  }

  get criteria(): QuestStatusCriteria[] {
    return [
      this.checkMarkCompleted,
      this.checkExpired,
      this.checkStartDate,
      this.checkValueAchieved,
    ];
  }

  async computeStatusForQuest(
    params: ComputeQuestStatusParams,
  ): Promise<QuestStatus> {
    for (const criteria of this.criteria) {
      const status = await criteria.bind(this)(params);
      if (status) {
        return status;
      }
    }
    return QuestStatus.ONGOING;
  }
}
