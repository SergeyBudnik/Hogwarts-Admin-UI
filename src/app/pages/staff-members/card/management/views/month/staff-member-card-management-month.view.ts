import {Component, Input} from '@angular/core';
import {StaffMemberCardManagementMonthViewData} from './staff-member-card-management-month.view.data';
import {NavigationService, TranslationService} from '../../../../../../service';
import {StaffMemberCardManagementWeekViewData} from '../week/staff-member-card-management-week.view.data';
import {Month} from '../../../../../../data';
import {DatesUtils} from '../../../../../../utils/dates-utils';
import {DatesDayUtils} from '../../../../../../utils/dates-day-utils';
import {StaffMemberWeekStatus, StaffMemberWeekStatusType} from '../../../../../../data/staff-member-week-status';

@Component({
  selector: 'app-staff-member-management-month-view',
  templateUrl: './staff-member-card-management-month.view.html',
  styleUrls: ['./staff-member-card-management-month.view.less']
})
export class StaffMemberCardManagementMonthViewComponent {
  public data: StaffMemberCardManagementMonthViewData;
  public weeks: Array<StaffMemberCardManagementWeekViewData>;

  public monthName: string;

  private weeksStatuses: Array<StaffMemberWeekStatusType> = [];

  public constructor(
    public navigationService: NavigationService,
    private translationService: TranslationService
  ) {}

  @Input("data") public set setData(data: StaffMemberCardManagementMonthViewData) {
    this.data = data;

    this.monthName = this.getMonthName(data);

    this.weeks = this.getWeeks(data.month, data.year);

    this.weeksStatuses = data.weeksStatuses;
  }

  public getWeekStatusType(weekIndex: number): StaffMemberWeekStatusType {
    if (this.weeksStatuses.length > weekIndex) {
      return this.weeksStatuses[weekIndex];
    } else {
      return 'OPENED';
    }
  }

  public goToWeekManagement(weekIndex: number) {
    this.navigationService
      .staffMembers()
      .id(this.data.login)
      .managementWeek(this.data.year, this.data.month, weekIndex)
      .go();
  }

  private getMonthName(data: StaffMemberCardManagementMonthViewData): string {
    return `${this.translationService.month().translate(data.month)} ${data.year}`;
  }

  private getWeeks(month: Month, year: number): Array<StaffMemberCardManagementWeekViewData> {
    const res: Array<StaffMemberCardManagementWeekViewData> = [];

    const monthLength = DatesUtils.monthLength(year, month);

    let i = 1;

    while (i <= monthLength) {
      const weekLength = this.getWeekLength(i, month, year);

      const weekStart = i;
      const weekFinish = monthLength < i + weekLength ? monthLength : i + weekLength;

      res.push(
        {
          start: weekStart,
          finish: weekFinish
        }
      );

      i += weekLength;
    }

    return res;
  }

  private getWeekLength(weekStartDate: number, month: Month, year: number): number {
    const time = DatesUtils.buildDateYMDFromYMD(
      year,
      DatesUtils.monthIndex(month),
      weekStartDate
    ).getTime();

    const dayOfWeek = DatesDayUtils.getDayOfWeek(time);

    switch (dayOfWeek) {
      case 'MONDAY': return 7;
      case 'TUESDAY': return 6;
      case 'WEDNESDAY': return 5;
      case 'THURSDAY': return 4;
      case 'FRIDAY': return 3;
      case 'SATURDAY': return 2;
      case 'SUNDAY': return 1;
      default: throw new Error(`Unexpected day of week '${dayOfWeek}'`);
    }
  }
}
