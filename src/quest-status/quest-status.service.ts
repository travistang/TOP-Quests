import { QuestStatus } from '@/entities/quest.entity';
import { Injectable } from '@nestjs/common';

type ComputeQuestStatusParams = {
  startDate: Date;
  dueDate: Date;
  target: number;
  achievedValue: number;
};
@Injectable()
export class QuestStatusService {
  computeStatusForQuest(params: ComputeQuestStatusParams): QuestStatus {
    const now = new Date();
    const { startDate, dueDate, target, achievedValue } = params;
    if (startDate > now) {
      return QuestStatus.NOT_STARTED;
    }

    const isValueAchieved = target <= achievedValue;
    if (isValueAchieved) {
      return QuestStatus.COMPLETED;
    }
    if (dueDate < now) {
      return QuestStatus.FAILED;
    }
    return QuestStatus.ONGOING;
  }
}
