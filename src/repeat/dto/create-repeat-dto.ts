import { RepeatType } from '@/entities/repeat.entity';
import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { Column } from 'typeorm';

@InputType()
export class CreateRepeatDto {
  @Field(() => RepeatType, { defaultValue: RepeatType.DAILY })
  @Column({ type: 'varchar', enum: RepeatType, default: RepeatType.DAILY })
  type: RepeatType;

  @Field(() => Int, { defaultValue: 1 })
  @Column({ type: 'integer', default: 1 })
  @Min(1)
  interval: number;
}
