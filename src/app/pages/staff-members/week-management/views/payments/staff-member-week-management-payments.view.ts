import {Component, Input} from '@angular/core';
import {StaffMemberWeekManagementPaymentsData} from './staff-member-week-management-payments.data';

@Component({
  selector: 'app-staff-member-week-management-payments-view',
  templateUrl: './staff-member-week-management-payments.view.html',
  styleUrls: ['./staff-member-week-management-payments.view.less']
})
export class StaffMemberWeekManagementPaymentsViewComponent {
  public data: StaffMemberWeekManagementPaymentsData;

  @Input('data') public set setData(data: StaffMemberWeekManagementPaymentsData) {
    this.data = data;
  }
}
