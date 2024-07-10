import { RepeatType } from '@/entities/repeat.entity';
import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { Column } from 'typeorm';

@InputType()
export class CreateRepeatDto {
  @Field(() => RepeatType, { defaultValue: RepeatType.DAILY })
  type: RepeatType;

  @Field(() => Int, { defaultValue: 1 })
  @Min(1)
  interval: number;

  @Field(() => [Int], { nullable: true, defaultValue: [] })
  dates?: number[];
}
