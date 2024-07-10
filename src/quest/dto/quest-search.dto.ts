import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsPositive, IsUUID, Min } from 'class-validator';
import { QuestStatus } from '@/entities/quest.entity';


@InputType()
export class QuestSearchDto {
    @Field(() => String, { nullable: true })
    searchString?: string;

    @Field(() => QuestStatus, { nullable: true })
    status?: QuestStatus;

    @Field(() => Date, { nullable: true })
    createdBefore?: Date;

    @Field(() => Date, { nullable: true })
    createdAfter?: Date;

    @Field(() => Int, { defaultValue: 10 })
    @IsPositive()
    @IsInt()
    pageSize: number;

    @Field(() => Int, { defaultValue: 0 })
    @Min(0)
    @IsInt()
    page: number;
}
