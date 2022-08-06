import {ExistingStudentPayment, NewStudentPayment, StaffMember} from '../../../../../../../data';
import {Component, EventEmitter, Output} from '@angular/core';
import {ModalStatus} from '../../../../../../../templates/modal/modal.template';
import {StudentPaymentHttp} from '../../../../../../../http';
import {StudentCardManagementModifyAttendanceViewData} from './student-card-management-modify-attendance.view.data';
import {GroupService} from '../../../../../../../service';

export class StudentCardManagementModifyAttendancePopupManager {
  private static popup: StudentCardManagementModifyAttendanceView = null;

  public static register(popup: StudentCardManagementModifyAttendanceView) {
    this.popup = popup;
  }

  public static show(data: StudentCardManagementModifyAttendanceViewData) {
    if (!!this.popup) {
      this.popup.show(data);
    }
  }
}

@Component({
  selector: 'app-student-card-management-modify-attendance',
  templateUrl: './student-card-management-modify-attendance.view.html',
  styleUrls: ['./student-card-management-modify-attendance.view.less']
})
export class StudentCardManagementModifyAttendanceView {
  @Output() public paymentAdded: EventEmitter<ExistingStudentPayment> = new EventEmitter<ExistingStudentPayment>();

  public modalStatus = new ModalStatus(false);

  public newStudentPayment = NewStudentPayment.createNew();

  public staffMembers: Array<StaffMember> = [];

  public data: StudentCardManagementModifyAttendanceViewData;
  public name: string = '';

  public constructor(
    private studentPaymentHttp: StudentPaymentHttp,
    private groupsService: GroupService
  ) {
    StudentCardManagementModifyAttendancePopupManager.register(this);
  }

  public show(data: StudentCardManagementModifyAttendanceViewData) {
    this.data = data;

    // this.newStudentPayment.info.studentLogin = studentLogin;
    // this.newStudentPayment.info.time = new Date().getTime();
    //
    // this.staffMembers = staffMember;

    this.modalStatus.visible = true;
  }

  // public onAmountChange(amountString: string): void {
  //   const amount = Number.parseInt(amountString);
  //
  //   if (!!amount && amount > 0) {
  //     this.newStudentPayment.info.amount = amount;
  //   } else {
  //     this.newStudentPayment.info.amount = null;
  //   }
  // }
  //
  // public addPayment(): void {
  //   this.studentPaymentHttp
  //     .addPayment(this.newStudentPayment)
  //     .then(paymentId => {
  //       this.paymentAdded.emit(ExistingStudentPayment.createNew(paymentId, this.newStudentPayment));
  //
  //       this.hideModal();
  //     });
  // }

  public cancel(): void {
    this.hideModal();
  }

  private hideModal(): void {
    this.modalStatus.visible = false;
  }
}
