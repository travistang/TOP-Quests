import { QuestStatusHistory } from "@/entities/quest-status-history.entity";
import { Quest } from "@/entities/quest.entity";
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { QuestStatusHistoryService } from "./quest-status-history.service";

@Resolver(() => Quest)
export class QuestStatusHistoryQuestResolver {
    constructor(
        private readonly questStatusHistoryService: QuestStatusHistoryService
    ) { }

    @ResolveField(() => [QuestStatusHistory])
    statusHistory(@Parent() quest: Quest) {
        return this.questStatusHistoryService.getStatusHistoriesOfQuest(quest.id);
    }
}