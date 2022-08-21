import {Component, Input} from '@angular/core';
import {StaffMemberWeekManagementSalaryDayData} from './staff-member-week-management-salary-day.data';
import {TranslationService} from '../../../../../service';
import {StaffMemberWeekManagementSalaryDayActionData} from '../salary-day-action/staff-member-week-management-salary-day-action.data';
import {StaffMemberAction} from '../../../../../data';

@Component({
  selector: 'app-staff-member-week-management-salary-day-view',
  templateUrl: './staff-member-week-management-salary-day.view.html',
  styleUrls: ['./staff-member-week-management-salary-day.view.less']
})
export class StaffMemberWeekManagementSalaryDayViewComponent {
  public data: StaffMemberWeekManagementSalaryDayData;

  public dayName: string;

  public constructor(
    private translationService: TranslationService
  ) {}

  @Input('data') public set setData(data: StaffMemberWeekManagementSalaryDayData) {
    this.data = data;

    this.dayName = this.translationService.dayOfWeek().translate(data.dayOfWeek);
  }

  public getActionData(staffMemberAction: StaffMemberAction): StaffMemberWeekManagementSalaryDayActionData {
    return {
      action: staffMemberAction
    }
  }
}
