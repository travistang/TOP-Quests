import { Field, Int, ObjectType, registerEnumType, ResolveField } from '@nestjs/graphql';
import { Matches, Min } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum RepeatType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}
registerEnumType(RepeatType, {
  name: 'RepeatType',
});

const SERIALIZED_DATES_REGEXP = /^\d+(,\d+)*$/

@ObjectType()
export class Repeat {
  @Field(() => RepeatType, { defaultValue: RepeatType.DAILY })
  @Column({ type: 'varchar', enum: RepeatType, default: RepeatType.DAILY })
  type: RepeatType;

  @Field(() => Int, { defaultValue: 1 })
  @Column({ type: 'integer', default: 1 })
  @Min(1)
  interval: number;

  @Column()
  @Matches(SERIALIZED_DATES_REGEXP)
  dates: string;

  repeatingDates(): number[] {
    return this.dates.split(',').map((date) => +date);
  }
}
