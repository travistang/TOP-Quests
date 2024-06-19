import { QuestInterval } from '@/entities/quest-interval.entity';
import { QuestStatusModule } from '@/quest-status/quest-status.module';
import { QuestModule } from '@/quest/quest.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestIntervalResolver } from './quest-interval.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestInterval]),
    QuestModule,
    QuestStatusModule,
  ],
  controllers: [],
  providers: [QuestIntervalResolver],
})
export class QuestIntervalModule {}
