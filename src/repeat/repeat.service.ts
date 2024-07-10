import { Repeat, RepeatType } from '@/entities/repeat.entity';
import { Injectable } from '@nestjs/common';
import { CreateRepeatDto } from './dto/create-repeat-dto';
import { differenceInDays, differenceInMonths, differenceInWeeks, getDate, getDay, getDaysInMonth, isBefore } from 'date-fns';
import { IsDateInRepeatParams } from './types/repeat-types';

const SERIALIZED_REPEAT_REGEXP = /^(DAILY|WEEKLY|MONTHLY)\|(\d+)\|(\d+(,\d+))*$/

@Injectable()
export class RepeatService {
  serialize(repeat: Repeat): string {
    return [repeat.type, repeat.interval, repeat.dates].join('|');
  }

  deserialize(repeatRepr?: string | null): Repeat | null {
    if (!repeatRepr) return null;

    const matches = repeatRepr.match(SERIALIZED_REPEAT_REGEXP);
    if (!matches) return null;

    const [, type, interval, dates] = matches;

    const repeat = new Repeat();
    repeat.type = type as RepeatType;
    repeat.interval = +interval;
    repeat.dates = dates;
    return repeat;
  }

  createRepeatFromDto(dto: CreateRepeatDto): Repeat {
    const repeat = new Repeat();
    repeat.dates = dto.dates ? dto.dates.join(',') : "";
    repeat.interval = dto.interval;
    repeat.type = dto.type;
    return repeat;
  }

  createSerializedRepeatFromDto(dto: CreateRepeatDto) {
    const repeat = this.createRepeatFromDto(dto);
    return this.serialize(repeat);
  }

  isDateInRepeat({ startDate, queryDate, repeat }: IsDateInRepeatParams) {
    if (isBefore(startDate, queryDate)) return false;

    switch (repeat.type) {
      case RepeatType.DAILY: {
        const numDayDifference = differenceInDays(queryDate, startDate);
        return numDayDifference % repeat.interval === 0
      }
      case RepeatType.WEEKLY: {
        const numWeekDifference = differenceInWeeks(queryDate, startDate);
        return numWeekDifference % repeat.interval === 0 && repeat.repeatingDates().includes(getDay(queryDate));
      }
      case RepeatType.MONTHLY: {
        const numMonthDifference = differenceInMonths(queryDate, startDate);
        return numMonthDifference % repeat.interval === 0 && repeat.repeatingDates().includes(getDate(queryDate));
      }
      default:
        return false;
    }
  }
}
