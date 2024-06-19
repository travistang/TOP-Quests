import { Module } from '@nestjs/common';
import { QuestStatusService } from './quest-status.service';

@Module({
  providers: [QuestStatusService],
  exports: [QuestStatusService],
})
export class QuestStatusModule {}
