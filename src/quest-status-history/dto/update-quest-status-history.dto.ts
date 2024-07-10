import { QuestStatus } from "@/entities/quest.entity";
import { Field, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class UpdateQuestStatusHistoryDto {
    @Field()
    @IsUUID()
    historyId: string;

    @Field()
    remark: string;
}