import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StaffMember, Student} from '../../data';
import {StudentPaymentViewData} from './student-payment.view.data';
import {StudentPaymentHttp} from '../../http';
import {NavigationService} from '../../service';

@Component({
  selector: 'app-student-payment',
  templateUrl: './student-payment.view.html',
  styleUrls: ['./student-payment.view.less']
})
export class StudentPaymentView {
  @Input() public data: StudentPaymentViewData;

  @Output('onPaymentDeleted')
  public paymentDeletedEventEmitter: EventEmitter<any> = new EventEmitter();
  @Output('onPaymentProcessed')
  public paymentProcessedEventEmitter: EventEmitter<boolean> = new EventEmitter();

  public constructor(
    private navigationService: NavigationService,
    private studentPaymentHttp: StudentPaymentHttp
  ) {}

  public getStaffMember(): StaffMember {
    return this.data.staffMembers.find(it => it.login === this.data.payment.info.staffMemberLogin);
  }

  public getStudent(): Student {
    return this.data.students.find(it => it.login === this.data.payment.info.studentLogin);
  }

  public processPayment(processed: boolean): void {
    this.studentPaymentHttp
      .processPayment(this.data.payment.id, processed)
      .then(() => {
        this.paymentProcessedEventEmitter.emit(processed);
      });
  }

  public deletePayment(): void {
    this.studentPaymentHttp
      .deletePayment(this.data.payment.id)
      .then(() => {
        this.paymentDeletedEventEmitter.emit();
      });
  }

  public navigateToStaffMember() {
    this.navigationService.staffMembers().id(this.data.payment.info.staffMemberLogin).information().go();
  }

  public navigateToStudent() {
    this.navigationService.students().login(this.data.payment.info.studentLogin).information().go();
  }
}
