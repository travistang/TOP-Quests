import { QuestDependency } from '@/entities/quest-dependency.entity';
import { Quest } from '@/entities/quest.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestDependencyCommonResolver } from './quest-dependency-common.resolver';
import { QuestDependencyQuestFieldResolver } from './quest-dependency-quest.resolver';
import { QuestDependencyService } from './quest-dependency.service';

@Module({
  providers: [
    QuestDependencyService,
    QuestDependencyCommonResolver,
    QuestDependencyQuestFieldResolver,
  ],
  imports: [TypeOrmModule.forFeature([QuestDependency, Quest])],
  exports: [QuestDependencyService],
})
export class QuestDependencyModule {}
