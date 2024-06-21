import { Quest } from '@/entities/quest.entity';
import { Recording } from '@/entities/recording.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordingsQuestResolver } from './recordings-quest.resolver';
import { RecordingsController } from './recordings.controller';
import { RecordingResolver } from './recordings.resolver';
import { RecordingsService } from './recordings.service';

@Module({
  controllers: [RecordingsController],
  providers: [RecordingsService, RecordingResolver, RecordingsQuestResolver],
  imports: [TypeOrmModule.forFeature([Recording, Quest])],
  exports: [RecordingsService],
})
export class RecordingsModule {}
