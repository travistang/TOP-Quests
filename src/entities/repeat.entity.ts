import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Min } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Quest } from './quest.entity';

export enum RepeatType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}
registerEnumType(RepeatType, {
  name: 'RepeatType',
});

@ObjectType()
@Entity('repeats')
export class Repeat {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => RepeatType, { defaultValue: RepeatType.DAILY })
  @Column({ type: 'varchar', enum: RepeatType, default: RepeatType.DAILY })
  type: RepeatType;

  @Field(() => Int, { defaultValue: 1 })
  @Column({ type: 'integer', default: 1 })
  @Min(1)
  interval: number;

  @Field(() => Quest)
  @OneToOne(() => Quest, (quest) => quest.repeat, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'questId' })
  quest: Quest;
}
