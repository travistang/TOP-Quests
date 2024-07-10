import { RecordingsModule } from '@/recordings/recordings.module';
import { RepeatModule } from '@/repeat/repeat.module';
import { Module } from '@nestjs/common';
import { QuestStatusHistoryService } from './quest-status-history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestStatusHistory } from '@/entities/quest-status-history.entity';
import { QuestStatusHistoryResolver } from './quest-status-history.resolver';
import { QuestStatusHistoryQuestResolver } from './quest-status-history.quest.resolver';

@Module({
  imports: [
    RecordingsModule,
    RepeatModule,
    TypeOrmModule.forFeature([QuestStatusHistory])
  ],
  providers: [
    QuestStatusHistoryService,
    QuestStatusHistoryResolver,
    QuestStatusHistoryQuestResolver
  ],
  exports: [QuestStatusHistoryService],
})
export class QuestStatusHistoryModule { }
