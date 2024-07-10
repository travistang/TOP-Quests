import { QuestStatus } from "@/entities/quest.entity";
import { Field, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class CreateQuestStatusHistoryDto {
    @Field()
    @IsUUID()
    questId: string;

    @Field(() => QuestStatus)
    from: QuestStatus;

    @Field(() => QuestStatus)
    to: QuestStatus;

    @Field({ nullable: true })
    remark?: string;
}