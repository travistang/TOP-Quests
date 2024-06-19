import {
  QuestDependency,
  QuestDependencyType,
} from '@/entities/quest-dependency.entity';
import { Quest } from '@/entities/quest.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateQuestDependencyDto } from './dto/create-quest-dependency.dto';
import { UpdateQuestDependencyDto } from './dto/update-quest-dependency.dto';

@Injectable()
export class QuestDependencyService {
  constructor(
    @InjectRepository(Quest)
    private readonly questRepository: Repository<Quest>,

    @InjectRepository(QuestDependency)
    private readonly questDependencyRepository: Repository<QuestDependency>,
  ) {}

  private mapEntityToDb(questDependency: QuestDependency) {
    return {
      ...questDependency,
      _dependentIds: JSON.stringify(questDependency.dependentIds),
    };
  }
  private mapEntityFromDb(questDependency: QuestDependency) {
    return {
      ...questDependency,
      dependentIds: JSON.parse(questDependency._dependentIds),
    };
  }

  async findByDependentId(questId: string) {
    return this.questDependencyRepository
      .createQueryBuilder('questDependency')
      .where('questDependency._dependentIds like :questId', {
        questId: `%${questId}%`,
      })
      .getOne()
      .then((entity) => (entity ? this.mapEntityFromDb(entity) : null));
  }

  async findByParentId(parentId: string) {
    return this.questDependencyRepository
      .findOne({ where: { parentId } })
      .then((entity) => (entity ? this.mapEntityFromDb(entity) : null));
  }

  async getQuests(...questIds: string[]) {
    return this.questRepository.findBy({ id: In(questIds) });
  }

  async createDependency(createDependencyDto: CreateQuestDependencyDto) {
    const existingDependency = await this.findByParentId(
      createDependencyDto.parentId,
    );
    const dependencyData = !existingDependency
      ? {
          parentId: createDependencyDto.parentId,
          dependentIds: [createDependencyDto.dependentId],
          blocking: false,
          numMinTasks: 0,
          type: QuestDependencyType.ALL_TASKS,
        }
      : {
          ...existingDependency,
          dependentIds: Array.from(
            new Set([
              ...existingDependency.dependentIds,
              createDependencyDto.dependentId,
            ]),
          ),
        };
    return this.questDependencyRepository.save(
      this.mapEntityToDb(dependencyData as QuestDependency),
    );
  }

  async removeDependency(dependentId: string) {
    const existingDependency = await this.findByDependentId(dependentId);
    if (!existingDependency) return;
    const remainingDependents = existingDependency.dependentIds.filter(
      (id) => id !== dependentId,
    );
    if (remainingDependents.length === 0) {
      await this.questDependencyRepository.delete(existingDependency.id);
    } else {
      await this.questDependencyRepository.update(existingDependency.id, {
        dependentIds: remainingDependents,
      });
    }
  }

  private validateDependency(dependency: QuestDependency) {
    if (dependency.numMinTasks > dependency.dependentIds.length) {
      throw new Error(
        'Number of minimum tasks is greater than the number of dependents',
      );
    }
  }

  async updateDependency(updateDependencyDto: UpdateQuestDependencyDto) {
    const existingDependency = await this.findByDependentId(
      updateDependencyDto.dependentId,
    );
    if (!existingDependency) return;

    const updatedDependency = {
      ...existingDependency,
      ...updateDependencyDto,
    } as unknown as QuestDependency;
    this.validateDependency(updatedDependency);

    return this.questDependencyRepository.save(
      this.mapEntityToDb(updatedDependency),
    );
  }
}
