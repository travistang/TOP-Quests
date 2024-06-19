import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';
import { RepeatType } from '../entities/repeat.entity';

export type IntervalHelperFunctions = {
  differenceInUnitInterval: (a: Date, b: Date) => number;
  addUnit: (date: Date, amount: number) => Date;
  startOfUnit: (date: Date) => Date;
};
export const IntervalHelperFunctionMapper: Record<
  RepeatType,
  IntervalHelperFunctions
> = {
  [RepeatType.DAILY]: {
    differenceInUnitInterval: differenceInDays,
    addUnit: addDays,
    startOfUnit: startOfDay,
  },
  [RepeatType.WEEKLY]: {
    differenceInUnitInterval: differenceInWeeks,
    addUnit: addWeeks,
    startOfUnit: startOfWeek,
  },
  [RepeatType.MONTHLY]: {
    differenceInUnitInterval: differenceInMonths,
    addUnit: addMonths,
    startOfUnit: startOfMonth,
  },
  [RepeatType.YEARLY]: {
    differenceInUnitInterval: differenceInYears,
    addUnit: addYears,
    startOfUnit: startOfYear,
  },
};

export const computeIntervalStart = (
  type: RepeatType,
  interval: number,
  startDate: Date,
  date: Date,
) => {
  const { differenceInUnitInterval, addUnit } =
    IntervalHelperFunctionMapper[type];
  const unitDifference = differenceInUnitInterval(date, startDate);
  const numIntervalsElapsed = Math.floor(unitDifference / interval);
  return startOfDay(addUnit(startDate, numIntervalsElapsed * interval));
};
