import { RecordingsModule } from '@/recordings/recordings.module';
import { RepeatModule } from '@/repeat/repeat.module';
import { Module } from '@nestjs/common';
import { QuestStatusQuestResolver } from './quest-status.resolver';
import { QuestStatusService } from './quest-status.service';

@Module({
  imports: [RecordingsModule, RepeatModule],
  providers: [QuestStatusService, QuestStatusQuestResolver],
  exports: [QuestStatusService],
})
export class QuestStatusModule {}
