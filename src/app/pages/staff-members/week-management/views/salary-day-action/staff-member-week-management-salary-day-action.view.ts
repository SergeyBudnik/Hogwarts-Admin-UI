import {Component, Input} from '@angular/core';
import {StaffMemberWeekManagementSalaryDayActionData} from './staff-member-week-management-salary-day-action.data';

@Component({
  selector: 'app-staff-member-week-management-salary-day-action-view',
  templateUrl: './staff-member-week-management-salary-day-action.view.html',
  styleUrls: ['./staff-member-week-management-salary-day-action.view.less']
})
export class StaffMemberWeekManagementSalaryDayActionViewComponent {
  public data: StaffMemberWeekManagementSalaryDayActionData = null;

  @Input('data') public set setData(data: StaffMemberWeekManagementSalaryDayActionData) {
    this.data = data;
  }
}
