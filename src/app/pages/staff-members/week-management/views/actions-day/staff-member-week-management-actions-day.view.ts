import {Component, Input} from '@angular/core';
import {StaffMemberWeekManagementActionsDayData} from './staff-member-week-management-actions-day.data';
import {TranslationService} from '../../../../../service';
import {StaffMemberWeekManagementActionsDayActionData} from '../actions-day-action/staff-member-week-management-actions-day-action.data';
import {StaffMemberAction} from '../../../../../data';

@Component({
  selector: 'app-staff-member-week-management-actions-day-view',
  templateUrl: './staff-member-week-management-actions-day.view.html',
  styleUrls: ['./staff-member-week-management-actions-day.view.less']
})
export class StaffMemberWeekManagementSalaryDayViewComponent {
  public data: StaffMemberWeekManagementActionsDayData;

  public dayName: string;

  public constructor(
    private translationService: TranslationService
  ) {}

  @Input('data') public set setData(data: StaffMemberWeekManagementActionsDayData) {
    this.data = data;

    this.dayName = this.translationService.dayOfWeek().translate(data.dayOfWeek);
  }

  public getActionData(staffMemberAction: StaffMemberAction): StaffMemberWeekManagementActionsDayActionData {
    return {
      action: staffMemberAction
    }
  }
}
