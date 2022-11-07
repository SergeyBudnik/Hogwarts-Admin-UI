import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StaffMemberWeekManagementTotalViewData} from './staff-member-week-management-total.view.data';
import {StaffMemberWeekStatusType} from '../../../../../data';

@Component({
  selector: 'app-staff-member-week-management-total-view',
  templateUrl: './staff-member-week-management-total.view.html',
  styleUrls: ['./staff-member-week-management-total.view.less']
})
export class StaffMemberWeekManagementTotalViewComponent {
  public total = 0;
  public totalSalary = 0;
  public totalPayments = 0;
  public statusType: StaffMemberWeekStatusType = 'OPENED';
  public weekOk = false;

  @Input('data') public set setData(data: StaffMemberWeekManagementTotalViewData) {
    this.totalPayments = StaffMemberWeekManagementTotalViewComponent.getTotalPayments(data);
    this.totalSalary = StaffMemberWeekManagementTotalViewComponent.getTotalSalary(data);

    this.total = this.totalSalary - this.totalPayments;

    this.statusType = data.statusType;

    this.weekOk = StaffMemberWeekManagementTotalViewComponent.isWeekOk(data);
  }

  @Output('onWeekClose') public weekCloseEventEmitter: EventEmitter<any> = new EventEmitter();
  @Output('onWeekReopen') public weekReopenEventEmitter: EventEmitter<any> = new EventEmitter();

  public closeWeek() {
    this.weekCloseEventEmitter.emit(null);
  }

  public reopenWeek() {
    this.weekReopenEventEmitter.emit(null);
  }

  private static isWeekOk(data: StaffMemberWeekManagementTotalViewData): boolean {
    const allPaymentsProcessed = this.isWeekPaymentsOk(data);
    const allActionsOk = this.isWeekActionsOk(data);

    return allPaymentsProcessed && allActionsOk;
  }

  private static isWeekPaymentsOk(data: StaffMemberWeekManagementTotalViewData) {
    return data.payments.filter(it => !it.processed).length === 0;
  }

  private static isWeekActionsOk(data: StaffMemberWeekManagementTotalViewData) {
    let res = true;

    data.actions.forEach((dayActions) => {
      dayActions.forEach(action => {
        if (action.status !== 'FINISHED' && action.status !== 'CANCELED') {
          res = false;
        }
      });
    })

    return res;
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
