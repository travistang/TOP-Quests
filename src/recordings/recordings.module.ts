import { Recording } from '@/entities/recording.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordingsController } from './recordings.controller';
import { RecordingResolver } from './recordings.resolver';
import { RecordingsService } from './recordings.service';

@Module({
  controllers: [RecordingsController],
  providers: [RecordingsService, RecordingResolver],
  imports: [TypeOrmModule.forFeature([Recording])],
  exports: [RecordingsService],
})
export class RecordingsModule {}
