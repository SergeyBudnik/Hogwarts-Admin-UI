import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StaffMemberWeekManagementPaymentsData} from './staff-member-week-management-payments.data';
import {StudentPaymentViewData} from '../../../../../parts/student-payment/student-payment.view.data';
import {ExistingStudentPayment, Student} from '../../../../../data';

@Component({
  selector: 'app-staff-member-week-management-payments-view',
  templateUrl: './staff-member-week-management-payments.view.html',
  styleUrls: ['./staff-member-week-management-payments.view.less']
})
export class StaffMemberWeekManagementPaymentsViewComponent {
  public paymentsData: Array<StudentPaymentViewData> = [];

  @Input('data') public set setData(data: StaffMemberWeekManagementPaymentsData) {
    this.paymentsData = data.payments.map(payment =>
      StaffMemberWeekManagementPaymentsViewComponent.getPaymentData(data.students, payment)
    );
  }

  @Output('onPaymentDeleted')
  public paymentDeletedEventEmitter: EventEmitter<number> = new EventEmitter();
  @Output('onPaymentProcessed')
  public paymentProcessedEventEmitter: EventEmitter<ExistingStudentPayment> = new EventEmitter();

  public onPaymentDeleted(data: StudentPaymentViewData) {
    this.paymentDeletedEventEmitter.emit(data.payment.id);

    // this.paymentsData = this.paymentsData.filter(it => it.payment.id !== data.payment.id);
  }

  public onPaymentProcessed(data: StudentPaymentViewData, processed: boolean) {
    this.paymentProcessedEventEmitter.emit(
      new ExistingStudentPayment(
        data.payment.id,
        data.payment.info,
        processed
      )
    );
    //
    // this.paymentsData = this.paymentsData.map(it => {
    //   return {
    //     payment: new ExistingStudentPayment(
    //       it.payment.id,
    //       it.payment.info,
    //       data.payment.id === it.payment.id ? processed : it.payment.processed
    //     ),
    //     staffMembers: it.staffMembers,
    //     students: it.students,
    //     mode: it.mode
    //   }
    // })
  }

  private static getPaymentData(
    students: Array<Student>,
    payment: ExistingStudentPayment
  ): StudentPaymentViewData {
    return {
      payment: payment,
      staffMembers: [],
      students: students,
      mode: 'STAFF_MEMBER'
    }
  }
}
