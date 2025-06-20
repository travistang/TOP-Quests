import { Quest } from '@/entities/quest.entity';
import { Repeat } from '@/entities/repeat.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';

@Injectable()
export class QuestService {
  constructor(
    @InjectRepository(Quest)
    private readonly questRepository: Repository<Quest>,
    @InjectRepository(Repeat)
    private readonly repeatRepository: Repository<Repeat>,
  ) {}

  create(createQuestDto: CreateQuestDto): Promise<Quest> {
    const quest = this.questRepository.create(createQuestDto);
    if (createQuestDto.repeat) {
      const repeat = this.repeatRepository.create(createQuestDto.repeat);
      quest.repeat = repeat;
    }
    return this.questRepository.save(quest);
  }

  findAll(): Promise<Quest[]> {
    return this.questRepository.find({
      order: { updatedAt: 'DESC' },
      relations: ['repeat'],
    });
  }

  findOne(id: string): Promise<Quest> {
    return this.questRepository.findOne({
      where: { id },
      relations: ['repeat'],
    });
  }

  async update(updateQuestDto: UpdateQuestDto): Promise<Quest> {
    if (updateQuestDto.repeat) {
      const quest = await this.questRepository.findOneBy({
        id: updateQuestDto.id,
      });
      const repeat = await this.repeatRepository.findOne({ where: { quest } });
      const savedRepeat = await this.repeatRepository.save({
        ...repeat,
        ...updateQuestDto.repeat,
      });
      updateQuestDto.repeat = savedRepeat;
    }
    return this.questRepository.save(updateQuestDto);
  }

  async remove(id: string): Promise<void> {
    await this.questRepository.delete(id);
  }
}
