import { QuestInterval } from '@/entities/quest-interval.entity';
import { QuestStatusModule } from '@/quest-status/quest-status.module';
import { RecordingsModule } from '@/recordings/recordings.module';
import { RepeatModule } from '@/repeat/repeat.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestIntervalQuestResolver } from './quest-interval-quest.resolver';
import { QuestIntervalResolver } from './quest-interval.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestInterval]),
    QuestStatusModule,
    RecordingsModule,
    RepeatModule,
  ],
  controllers: [],
  providers: [QuestIntervalResolver, QuestIntervalQuestResolver],
})
export class QuestIntervalModule {}
