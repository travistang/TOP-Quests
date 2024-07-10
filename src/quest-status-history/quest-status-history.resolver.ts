import { QuestStatusHistory } from "@/entities/quest-status-history.entity";
import { Args, Mutation, ResolveField, Resolver } from "@nestjs/graphql";
import { QuestStatusHistoryService } from "./quest-status-history.service";

@Resolver(() => QuestStatusHistory)
export class QuestStatusHistoryResolver {
    constructor(
        private readonly questStatusHistoryService: QuestStatusHistoryService,
    ) { }

    @Mutation(() => QuestStatusHistory)
    updateQuestStatusHistory(@Args('historyId') historyId: string, @Args('remark') remark: string) {
        return this.questStatusHistoryService.updateQuestStatusHistory({
            historyId,
            remark
        })
    }
}