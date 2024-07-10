import { Args, Resolver, Query } from "@nestjs/graphql";
import { QuestSearchService } from "./quest-search.service";
import { QuestSearchResult } from "./dto/ques-search-result.dto";
import { QuestSearchDto } from "./dto/quest-search.dto";

@Resolver()
export class QuestSearchResolver {
    constructor(private readonly questSearchService: QuestSearchService) {

    }

    @Query(() => QuestSearchResult)
    searchQuests(@Args('search') questSearchDto: QuestSearchDto) {
        return this.questSearchService.search(questSearchDto);
    }
}