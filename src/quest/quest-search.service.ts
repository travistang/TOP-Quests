import { Quest } from "@/entities/quest.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brackets, Repository } from "typeorm";
import { QuestSearchDto } from "./dto/quest-search.dto";
import { QuestSearchResult } from "./dto/ques-search-result.dto";

@Injectable()
export class QuestSearchService {
    constructor(
        @InjectRepository(Quest)
        private readonly questRepository: Repository<Quest>
    ) { }

    async search(searchDto: QuestSearchDto): Promise<QuestSearchResult> {
        const { searchString, status, createdAfter, createdBefore, pageSize, page } = searchDto;
        let query = this.questRepository.createQueryBuilder('quest')

        if (searchString) {
            query = query.where(new Brackets((bracket) => {
                bracket
                    .where('quest.name like :searchString', { searchString: `%${searchString}%` })
                    .orWhere('quest.description like :searchString', { searchString: `%${searchString}%` })
            }))

        }

        if (status) {
            query = query.andWhere('quest.status = :status', { status })
        }

        if (createdAfter) {
            query = query.andWhere('quest.createdAt >= :createdAfter', { createdAfter })
        }

        if (createdBefore) {
            query = query.andWhere('quest.createdAt <= :createdBefore', { createdBefore })
        }

        const [data, recordsCount] = await query
            .orderBy('createdAt', 'DESC')
            .offset(pageSize * page)
            .limit(pageSize)
            .getManyAndCount();

        return {
            data,
            recordsCount,
            pagesCount: Math.ceil(recordsCount / pageSize)
        }
    }
}