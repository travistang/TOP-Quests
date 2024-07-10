import { Repeat } from '@/entities/repeat.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quest } from '../entities/quest.entity';
import { QuestController } from './quest.controller';
import { QuestResolver } from './quest.resolver';
import { QuestService } from './quest.service';
import { QuestStatusHistoryModule } from '@/quest-status-history/quest-status.module';
import { RepeatModule } from '@/repeat/repeat.module';

@Module({
  providers: [QuestService, QuestResolver],
  controllers: [QuestController],
  imports: [
    TypeOrmModule.forFeature([Quest]),
    RepeatModule,
    QuestStatusHistoryModule
  ],
  exports: [QuestService],
})
export class QuestModule { }
