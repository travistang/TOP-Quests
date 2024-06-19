import { differenceInHours } from 'date-fns';
import { Quest } from '../entities/quest.entity';
import { RepeatType } from '../entities/repeat.entity';
import { RepeatService } from './repeat.service';

const makeDate = (year: number, month: number, day: number): Date =>
  new Date(Date.UTC(year, month - 1, day));

const isDayEqual = (date1: Date, date2: Date): boolean =>
  differenceInHours(date1, date2) < 1;

type TestCaseParameters = {
  repeatType: RepeatType;
  startDate: Date;
  interval: number;
  currentDate: Date;
  expected: Date;
};

describe('RepeatService', () => {
  let repeatService: RepeatService;

  const createTestCase = ({
    startDate,
    interval,
    currentDate,
    expected,
    repeatType,
  }: TestCaseParameters) => {
    const quest = {
      repeat: {
        type: repeatType,
        interval,
      },
      startDate,
    } as Quest;
    const intervalStart = repeatService.getIntervalStartOnDate(
      quest,
      currentDate,
    );
    expect(isDayEqual(intervalStart, expected)).toBe(true);
  };

  beforeEach(() => {
    repeatService = new RepeatService();
  });

  describe('getIntervalStartOnDate', () => {
    it('should compute correct start date for next interval when repeat type is DAILY', () => {
      createTestCase({
        repeatType: RepeatType.DAILY,
        startDate: makeDate(2024, 6, 1),
        interval: 1,
        currentDate: makeDate(2024, 6, 15),
        expected: makeDate(2024, 6, 15),
      });
    });
  });

  it('should compute correct start date for next interval when repeat type is DAILY and interval is greater than 1', () => {
    createTestCase({
      repeatType: RepeatType.DAILY,
      startDate: makeDate(2024, 6, 1),
      interval: 2,
      currentDate: makeDate(2024, 6, 4),
      expected: makeDate(2024, 6, 3),
    });
  });
  it('should compute correct start date for next interval when repeat type is WEEKLY and interval is greater than 1', () => {
    createTestCase({
      repeatType: RepeatType.WEEKLY,
      startDate: makeDate(2024, 6, 1),
      interval: 2,
      currentDate: makeDate(2024, 6, 17),
      expected: makeDate(2024, 6, 17),
    });
  });
  it('should compute correct start date for next interval when repeat type is WEEKLY and interval is greater than 2', () => {
    createTestCase({
      repeatType: RepeatType.WEEKLY,
      interval: 5,
      startDate: makeDate(2024, 6, 1),
      currentDate: makeDate(2024, 6, 15),
      expected: makeDate(2024, 6, 1),
    });
  });
  it('should compute correct start date for next interval when repeat type is WEEKLY and interval is greater than 5 and falling within the 2nd interval', () => {
    createTestCase({
      repeatType: RepeatType.WEEKLY,
      interval: 5,
      startDate: makeDate(2024, 6, 1),
      currentDate: makeDate(2024, 7, 19),
      expected: makeDate(2024, 7, 6),
    });
  });

  it('should compute correct start date for next interval when repeat type is MONTHLY and interval is greater than 1', () => {
    createTestCase({
      repeatType: RepeatType.MONTHLY,
      interval: 2,
      startDate: makeDate(2024, 6, 1),
      currentDate: makeDate(2024, 7, 15),
      expected: makeDate(2024, 6, 1),
    });
  });
  it('should compute correct start date for next interval when repeat type is MONTHLY and interval is greater than 2', () => {
    createTestCase({
      repeatType: RepeatType.MONTHLY,
      interval: 3,
      startDate: makeDate(2024, 6, 1),
      currentDate: makeDate(2024, 12, 15),
      expected: makeDate(2024, 12, 1),
    });
  });

  it('should compute correct start date even for months with different number of days like February', () => {
    createTestCase({
      repeatType: RepeatType.MONTHLY,
      interval: 3,
      startDate: makeDate(2024, 6, 1),
      currentDate: makeDate(2025, 4, 30),
      expected: makeDate(2025, 3, 1),
    });
  });

  it('should compute correct start date for next interval when repeat type is YEARLY and interval is greater than 1', () => {
    createTestCase({
      repeatType: RepeatType.YEARLY,
      interval: 2,
      startDate: makeDate(2024, 6, 1),
      currentDate: makeDate(2026, 6, 15),
      expected: makeDate(2026, 6, 1),
    });
  });
  it('should compute correct start date for next interval when repeat type is YEARLY and interval is greater than 2', () => {
    createTestCase({
      repeatType: RepeatType.YEARLY,
      interval: 2,
      startDate: makeDate(2024, 6, 1),
      currentDate: makeDate(2030, 6, 15),
      expected: makeDate(2030, 6, 1),
    });
  });
});
