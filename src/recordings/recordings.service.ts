import { Quest } from '@/entities/quest.entity';
import { RecordFilter, Recording } from '@/entities/recording.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecordingDto } from './dto/create-recording-dto';
import { UpdateRecordingDto } from './dto/update-recording-dto';

@Injectable()
export class RecordingsService {
  constructor(
    @InjectRepository(Recording)
    private recordingRepository: Repository<Recording>,
  ) {}

  findAll(): Promise<Recording[]> {
    return this.recordingRepository.find({ order: { createdAt: 'DESC' } });
  }

  async getQuestOfRecording(recording: Recording): Promise<Quest | undefined> {
    const recordingWithQuest = await this.recordingRepository.findOne({
      where: { id: recording.id },
      relations: ['quest'],
    });
    return recordingWithQuest?.quest;
  }

  async update(recording: UpdateRecordingDto) {
    this.recordingRepository.update({ id: recording.id }, recording);
  }

  findRecordsOfQuest(questId: string, filter: RecordFilter) {
    const builder = this.recordingRepository
      .createQueryBuilder('recording')
      .where('recording.questId = :questId', { questId });
    if (filter.start) {
      builder.andWhere('recording.createdAt >= :start', {
        start: filter.start,
      });
    }
    if (filter.end) {
      builder.andWhere('recording.createdAt <= :end', { end: filter.end });
    }

    return builder.orderBy('recording.createdAt', 'DESC').getMany();
  }

  async createRecording(
    createRecordingDto: CreateRecordingDto,
    quest: Quest,
  ): Promise<Recording> {
    const recording = new Recording();
    recording.quest = quest;
    recording.note = createRecordingDto.note;
    recording.value = createRecordingDto.value;

    return this.recordingRepository.save(recording);
  }
}
