import {DayOfWeek, Month} from '../data';
import {DatesUtils} from './dates-utils';

export class DatesDayUtils {
  public static getDayOfWeek(time: number): DayOfWeek {
    const day = new Date(time).getDay();

    switch (day) {
      case 1: return 'MONDAY';
      case 2: return 'TUESDAY';
      case 3: return 'WEDNESDAY';
      case 4: return 'THURSDAY';
      case 5: return 'FRIDAY';
      case 6: return 'SATURDAY';
      case 0: return 'SUNDAY';
      default: throw new Error(`Unexpected day value '${day}'`);
    }
  }

  public static getDayStart(year: number, month: Month, date: number): number {
    return new Date(
      year,
      DatesUtils.monthIndex(month),
      date + 1,
      0, 0, 0, 0
    ).getTime();
  }

  public static getDayFinish(year: number, month: Month, date: number): number {
    return new Date(
      year,
      DatesUtils.monthIndex(month),
      date + 1,
      23, 59, 59, 0
    ).getTime();
  }
}
