import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Quest, QuestStatus } from "./quest.entity";

@ObjectType()
@Entity('quest_status_history')
export class QuestStatusHistory {
    @Field(() => String)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @CreateDateColumn()
    date: Date;

    @Field(() => QuestStatus)
    @Column()
    from: QuestStatus;

    @Field(() => QuestStatus)
    @Column()
    to: QuestStatus;

    @Field({ defaultValue: "" })
    @Column({ default: "" })
    remark?: string;

    @ManyToOne(() => Quest, quest => quest.statusHistory)
    quest: Quest;

    @Column()
    questId: string;

}