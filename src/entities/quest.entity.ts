import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Recording } from './recording.entity';
import { Repeat } from './repeat.entity';

export enum QuestStatus {
  NOT_STARTED = 'NOT_STARTED',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
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

  @Field(() => Boolean, { defaultValue: false })
  @Column({ default: false })
  markCompleted: boolean;

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

  @Field({ nullable: true })
  @OneToOne(() => Repeat, (repeat) => repeat.quest, { nullable: true })
  @JoinColumn({ name: 'repeatId' })
  repeat?: Repeat;

  @OneToMany(() => Recording, (record) => record.quest, {
    nullable: true,
  })
  @JoinColumn()
  recordings: Recording[];
}
