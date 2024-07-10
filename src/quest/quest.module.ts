import { Repeat } from '@/entities/repeat.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quest } from '../entities/quest.entity';
import { QuestController } from './quest.controller';
import { QuestResolver } from './quest.resolver';
import { QuestService } from './quest.service';
import { QuestStatusHistoryModule } from '@/quest-status-history/quest-status.module';
import { RepeatModule } from '@/repeat/repeat.module';
import { QuestSearchService } from './quest-search.service';
import { QuestSearchResolver } from './quest-search.resolver';

@Module({
  providers: [
    QuestService, QuestResolver,
    QuestSearchService, QuestSearchResolver
  ],
  controllers: [QuestController],
  imports: [
    TypeOrmModule.forFeature([Quest]),
    RepeatModule,
    QuestStatusHistoryModule
  ],
  exports: [QuestService],
})
export class QuestModule { }
