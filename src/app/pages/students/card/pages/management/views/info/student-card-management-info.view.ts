import {Component, Input} from '@angular/core';
import {ExistingStudentPayment, Group, StudentAttendance} from '../../../../../../../data';
import {StudentCardManagementInfoViewData} from './student-card-management-info.view.data';

@Component({
  selector: 'app-student-card-management-info',
  templateUrl: './student-card-management-info.view.html',
  styleUrls: ['./student-card-management-info.view.less']
})
export class StudentCardManagementInfoView {
  public debtActual = 0;
  public debtTillEndOfMonth = 0;

  @Input("data") set setData(data: StudentCardManagementInfoViewData) {
    this.init(data);
  }

  private init(data: StudentCardManagementInfoViewData) {
    const totalPayments = this.getTotalPayments(data.payments);

    const attendancesPrice = this.getAttendancesPrice(data.attendances);

    this.debtActual = attendancesPrice - totalPayments;
  }

  private getTotalPayments(payments: Array<ExistingStudentPayment>): number {
    return payments
      .map(payment => payment.info.amount)
      .reduce((previous, current) => {
        if (!previous) {
          return current;
        } else {
          return previous + current;
        }
      }, 0);
  }

  private getAttendancesPrice(attendances: Array<StudentAttendance>): number {
    return attendances
      .map(attendance => {
        const minutes = (attendance.finishTime - attendance.startTime) / 1000 / 60;

        if (attendance.groupType === 'GROUP') {
          return 750 * minutes / 90;
        } else {
          return 1500 * minutes / 60;
        }
      }).reduce((previous, current) => {
        if (!previous) {
          return current;
        } else {
          return previous + current;
        }
      }, 0);
  }
}
