import { QuestStatusHistory } from "@/entities/quest-status-history.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateQuestStatusHistoryDto } from "./dto/create-quest-status-history.dto";
import { UpdateQuestStatusHistoryDto } from "./dto/update-quest-status-history.dto";

@Injectable()
export class QuestStatusHistoryService {
    constructor(
        @InjectRepository(QuestStatusHistory)
        private readonly questStatusHistoryRepository: Repository<QuestStatusHistory>
    ) { }

    getStatusHistoriesOfQuest(questId: string) {
        return this.questStatusHistoryRepository
            .createQueryBuilder('history')
            .where('history.questId = :questId', { questId })
            .orderBy('date', 'DESC')
            .getMany();
    }

    async createQuestStatusHistory(data: CreateQuestStatusHistoryDto) {
        return this.questStatusHistoryRepository.save(data);
    }

    async updateQuestStatusHistory(data: UpdateQuestStatusHistoryDto) {
        await this.questStatusHistoryRepository.update({ id: data.historyId }, { remark: data.remark });
        return this.questStatusHistoryRepository.findOneBy({ id: data.historyId });
    }
}