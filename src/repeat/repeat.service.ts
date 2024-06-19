import { Quest } from '../entities/quest.entity';

import { Injectable } from '@nestjs/common';
import { endOfDay } from 'date-fns';
import {
  IntervalHelperFunctionMapper,
  computeIntervalStart,
} from './repeat.helper';

@Injectable()
export class RepeatService {
  getIntervalEndOnDate(quest: Quest, date: Date): Date {
    const {
      repeat: { type, interval },
    } = quest;
    const intervalStart = this.getIntervalStartOnDate(quest, date);
    const { addUnit } = IntervalHelperFunctionMapper[type];
    return endOfDay(addUnit(intervalStart, interval));
  }

  getIntervalStartOnDate(quest: Quest, date: Date): Date {
    const { repeat, startDate } = quest;
    return computeIntervalStart(repeat.type, repeat.interval, startDate, date);
  }

  getIntervalOnDate(quest: Quest, date: Date): [Date, Date | null] | null {
    const { repeat, startDate } = quest;
    if (!repeat) {
      return [startDate, null];
    }
    const endDate = quest.dueDate;
    if (date < startDate) {
      return null;
    }

    if (endDate && date > endDate) {
      return null;
    }

    return [
      this.getIntervalStartOnDate(quest, date),
      this.getIntervalEndOnDate(quest, date),
    ];
  }
}
