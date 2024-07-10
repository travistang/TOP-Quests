import { Quest } from '@/entities/quest.entity';
import { Repeat } from '@/entities/repeat.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { QuestStatusHistoryService } from '@/quest-status-history/quest-status-history.service';
import { RepeatService } from '@/repeat/repeat.service';

@Injectable()
export class QuestService {
  constructor(
    @InjectRepository(Quest)
    private readonly questRepository: Repository<Quest>,

    private readonly repeatService: RepeatService,
    private readonly questStatusHistoryService: QuestStatusHistoryService,
  ) { }

  create(createQuestDto: CreateQuestDto): Promise<Quest> {
    const { repeat: repeatDto, ...createQuestData } = createQuestDto;
    const quest = this.questRepository.create(createQuestData);
    if (repeatDto) {
      const repeat = this.repeatService.createRepeatFromDto(repeatDto);
      quest.repeat = this.repeatService.serialize(repeat);
    }
    return this.questRepository.save(quest);
  }

  findAll(): Promise<Quest[]> {
    return this.questRepository.find({
      order: { updatedAt: 'DESC' },
    });
  }

  findOne(id: string): Promise<Quest> {
    return this.questRepository.findOne({
      where: { id },
    });
  }

  async update(updateQuestDto: UpdateQuestDto): Promise<Quest> {
    const {
      id,
      status: newStatus,
      statusRemark,
      repeat: newRepeatData,
      ...updateQuestData
    } = updateQuestDto;
    const currentQuest = await this.findOne(id);

    if (newStatus && newStatus !== currentQuest.status) {
      await this.questStatusHistoryService.createQuestStatusHistory({
        questId: currentQuest.id,
        from: currentQuest.status,
        to: updateQuestDto.status,
        remark: updateQuestDto.statusRemark,
      })
    }
    const newQuestData: Partial<Quest> = { ...updateQuestData };
    if (newRepeatData) {
      newQuestData.repeat = this.repeatService.createSerializedRepeatFromDto(newRepeatData);
    }
    await this.questRepository.update(id, newQuestData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.questRepository.delete(id);
  }

  async getChildren(quest: Quest): Promise<Quest[]> {
    return this.questRepository.createQueryBuilder('quest')
      .where('quest.parentId = :parentId', { parentId: quest.id })
      .getMany();
  }
}
