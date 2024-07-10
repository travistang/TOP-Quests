import { Quest, QuestStatus } from '@/entities/quest.entity';

export type ComputeQuestStatusParams = {
  quest: Quest;
  interval?: [Date, Date];
};
export type QuestStatusCriteria = (
  params: ComputeQuestStatusParams,
) => Promise<QuestStatus | null>;
