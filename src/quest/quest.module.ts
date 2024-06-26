import { Repeat } from '@/entities/repeat.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quest } from '../entities/quest.entity';
import { QuestResolver } from './quest.resolver';
import { QuestService } from './quest.service';

@Module({
  providers: [QuestService, QuestResolver],
  imports: [TypeOrmModule.forFeature([Quest, Repeat])],
  exports: [QuestService],
})
export class QuestModule {}
