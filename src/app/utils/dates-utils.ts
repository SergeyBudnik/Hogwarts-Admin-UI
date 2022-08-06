import {Month} from '../data';

export class DatesUtils {
  public static buildDateYMDFromDate(date: Date): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0, 0, 0, 0
    );
  }

  public static buildDateYMDFromYMD(year: number, month: number, date: number): Date {
    return new Date(
      year,
      month,
      date,
      0, 0, 0, 0
    );
  }

  public static monthLength(year: number, month: Month): number {
    switch (month) {
      case 'JAN': return 31;
      case 'FEB': {
        if (year % 4 === 0) {
          return 29;
        } else {
          return 28;
        }
      }
      case 'MAR': return 31;
      case 'APR': return 30;
      case 'MAY': return 31;
      case 'JUN': return 30;
      case 'JUL': return 31;
      case 'AUG': return 31;
      case 'SEP': return 30;
      case 'OCT': return 31;
      case 'NOV': return 30;
      case 'DEC': return 31;
    }

    throw new Error(`Unexpected ${month}`);
  }

  public static monthIndex(month: Month): number {
    switch (month) {
      case 'JAN': return 0;
      case 'FEB': return 1;
      case 'MAR': return 2;
      case 'APR': return 3;
      case 'MAY': return 4;
      case 'JUN': return 5;
      case 'JUL': return 6;
      case 'AUG': return 7;
      case 'SEP': return 8;
      case 'OCT': return 9;
      case 'NOV': return 10;
      case 'DEC': return 11;
    }
  }

  public static monthStart(year: number, month: Month): number {
    return new Date(
      year,
      this.monthIndex(month),
      0,
      0, 0, 0, 0
    ).getTime();
  }

  public static monthFinish(year: number, month: Month): number {
    return new Date(
      year,
      this.monthIndex(month),
      this.monthLength(year, month) - 1,
      23, 59, 59, 0
    ).getTime();
  }
}
