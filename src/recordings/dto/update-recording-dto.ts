import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsPositive, IsUUID } from 'class-validator';
import { CreateRecordingDto } from './create-recording-dto';

@InputType()
export class UpdateRecordingDto extends OmitType(
  PartialType(CreateRecordingDto),
  ['questId'],
) {
  @Field(() => String)
  @IsUUID()
  id: string;

  @Field()
  @IsPositive()
  value: number;

  @Field({ nullable: true })
  note?: string;
}
