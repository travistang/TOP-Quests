import { CreateRepeatDto } from '@/repeat/dto/create-repeat-dto';
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CreateQuestDto {
  @Field()
  name: string;

  @Field()
  target: number;

  @Field()
  description: string;

  @Field()
  unit: string;

  @Field({ nullable: true })
  @IsOptional()
  startedAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  completedAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  dueDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  repeat?: CreateRepeatDto;
}
