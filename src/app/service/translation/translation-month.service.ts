import {Month} from '../../data';

export class TranslationMonthService {
  public translate(month: Month): string {
    switch (month) {
      case 'JAN': return 'Январь';
      case 'FEB': return 'Февраль';
      case 'MAR': return 'Март';
      case 'APR': return 'Апрель';
      case 'MAY': return 'Май';
      case 'JUN': return 'Июнь';
      case 'JUL': return 'Июль';
      case 'AUG': return 'Август';
      case 'SEP': return 'Сентябрь';
      case 'OCT': return 'Октябрь';
      case 'NOV': return 'Ноябрь';
      case 'DEC': return 'Декабрь';
      default:
        throw Error(`Unexpected month '${month}'`);
    }
  }
}
