import { Repeat } from '@/entities/repeat.entity';
import { QuestStatusModule } from '@/quest-status/quest-status.module';
import { RecordingsModule } from '@/recordings/recordings.module';
import { RepeatModule } from '@/repeat/repeat.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quest } from '../entities/quest.entity';
import { QuestController } from './quest.controller';
import { QuestResolver } from './quest.resolver';
import { QuestService } from './quest.service';

@Module({
  providers: [QuestService, QuestResolver],
  controllers: [QuestController],
  imports: [
    TypeOrmModule.forFeature([Quest, Repeat]),
    RecordingsModule,
    RepeatModule,
    QuestStatusModule,
  ],
  exports: [QuestService],
})
export class QuestModule {}
