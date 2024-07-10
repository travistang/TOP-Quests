import { Module } from '@nestjs/common';
import { RepeatService } from './repeat.service';
import { RepeatQuestResolver } from './repeat.quest.resolver';
import { RepeatResolver } from './repeat.resolver';

@Module({
  providers: [RepeatService, RepeatQuestResolver, RepeatResolver],
  exports: [RepeatService],
})
export class RepeatModule { }
