import {Component, Input} from '@angular/core';
import {StaffMemberWeekManagementActionsDayActionData} from './staff-member-week-management-actions-day-action.data';

@Component({
  selector: 'app-staff-member-week-management-actions-day-action-view',
  templateUrl: './staff-member-week-management-actions-day-action.view.html',
  styleUrls: ['./staff-member-week-management-actions-day-action.view.less']
})
export class StaffMemberWeekManagementSalaryDayActionViewComponent {
  public data: StaffMemberWeekManagementActionsDayActionData = null;

  @Input('data') public set setData(data: StaffMemberWeekManagementActionsDayActionData) {
    this.data = data;
  }

  public isStatusFinished(): boolean {
    return this.data.action.status === 'FINISHED';
  }

  public isStatusCanceled(): boolean {
    return this.data.action.status === 'CANCELED';
  }

  public isStatusNotFilled(): boolean {
    return this.data.action.status === 'NOT_FILLED';
  }

  public isStatusFuture(): boolean {
    return this.data.action.status === 'FUTURE';
  }
}
