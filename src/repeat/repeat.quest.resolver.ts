import { Quest } from "@/entities/quest.entity";
import { Repeat } from "@/entities/repeat.entity";
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { RepeatService } from "./repeat.service";

@Resolver(() => Quest)
export class RepeatQuestResolver {

    constructor(private readonly repeatService: RepeatService) { }

    @ResolveField(() => Repeat, { nullable: true })
    repeat(@Parent() quest: Quest) {
        return this.repeatService.deserialize(quest.repeat);
    }
}