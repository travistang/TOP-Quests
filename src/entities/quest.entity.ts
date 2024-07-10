import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Recording } from './recording.entity';
import { Repeat } from './repeat.entity';
import { QuestStatusHistory } from './quest-status-history.entity';

export enum QuestStatus {
  NOT_STARTED = 'NOT_STARTED',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  BLOCKED = 'BLOCKED',
}

registerEnumType(QuestStatus, {
  name: 'QuestStatus',
});

@ObjectType()
@Entity('quests')
export class Quest {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => QuestStatus, { defaultValue: QuestStatus.NOT_STARTED })
  @Column({ default: QuestStatus.NOT_STARTED, type: 'varchar', enum: QuestStatus })
  status: QuestStatus;

  @Field()
  @Column()
  target: number;

  @Field()
  @Column()
  unit: string;

  @Field(() => Date, { nullable: true })
  dueDate?: Date;

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  startDate: Date;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Quest, quest => quest.parentId)
  parent?: Quest;

  @Column({ nullable: true })
  parentId?: string;

  @Column({ nullable: true })
  repeat?: string;

  @OneToMany(() => Recording, (record) => record.quest, {
    nullable: true,
  })
  @JoinColumn()
  recordings: Recording[];


  @OneToMany(() => QuestStatusHistory, (history) => history.quest)
  statusHistory: QuestStatusHistory[];
}
