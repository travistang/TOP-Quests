import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive, IsUUID } from 'class-validator';

@InputType()
export class CreateRecordingDto {
  @IsNotEmpty()
  @IsUUID()
  @Field(() => String)
  questId: string;

  @Field()
  @IsPositive()
  value: number;

  @Field({ nullable: true })
  note?: string;
}
