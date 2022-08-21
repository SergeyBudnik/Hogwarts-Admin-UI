import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StaffMemberWeekManagementTotalViewData} from './staff-member-week-management-total.view.data';

@Component({
  selector: 'app-staff-member-week-management-total-view',
  templateUrl: './staff-member-week-management-total.view.html',
  styleUrls: ['./staff-member-week-management-total.view.less']
})
export class StaffMemberWeekManagementTotalViewComponent {
  public total = 0;
  public totalSalary = 0;
  public totalPayments = 0;

  @Input('data') public set setData(data: StaffMemberWeekManagementTotalViewData) {
    this.totalPayments = StaffMemberWeekManagementTotalViewComponent.getTotalPayments(data);
    this.totalSalary = StaffMemberWeekManagementTotalViewComponent.getTotalSalary(data);

    this.total = this.totalSalary - this.totalPayments;
  }

  @Output('onFinishWeek') public finishWeekEventEmitter: EventEmitter<any> = new EventEmitter();

  public finishWeek() {
    this.finishWeekEventEmitter.emit(null);
  }

  private static getTotalPayments(data: StaffMemberWeekManagementTotalViewData): number {
    return data.payments
      .map(it => it.info.amount)
      .reduce((previous, current) => {
        if (!previous) {
          return current;
        } else {
          return previous + current;
        }
      }, 0);
  }

  private static getTotalSalary(data: StaffMemberWeekManagementTotalViewData): number {
    let res = 0;

    data.actions.forEach((dayActions) => {
      dayActions.forEach(action => {
          if (action.status === 'FINISHED') {
            res += action.price;
          }
      });
    })

    return res;
  }
}
