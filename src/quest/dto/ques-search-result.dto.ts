import { Quest } from "@/entities/quest.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class QuestSearchResult {
    @Field(() => [Quest])
    data: Quest[];

    @Field(() => Int)
    recordsCount: number;

    @Field(() => Int)
    pagesCount: number;

}