import { Module } from '@nestjs/common';
import { RepeatService } from './repeat.service';

@Module({
  providers: [RepeatService],
  exports: [RepeatService],
})
export class RepeatModule {}
