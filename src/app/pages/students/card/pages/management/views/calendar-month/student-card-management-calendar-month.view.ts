import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StudentCardManagementMonth} from '../../data/student-card-management-month';
import {LessonInstance} from '../../../../../../../data/lesson-instance';

@Component({
  selector: 'app-student-card-management-calendar-month',
  templateUrl: './student-card-management-calendar-month.view.html',
  styleUrls: ['./student-card-management-calendar-month.view.less']
})
export class StudentCardManagementCalendarMonthView {
  @Input("month")
  public month: StudentCardManagementMonth = null;

  @Output("onRequestAddPayment")
  public requestAddPaymentEventEmitter: EventEmitter<any> = new EventEmitter();
  @Output("onLessonInstanceClick")
  public lessonInstanceClickEventEmitter: EventEmitter<LessonInstance> = new EventEmitter<LessonInstance>();

  public onRequestAddPayment() {
    this.requestAddPaymentEventEmitter.emit(null);
  }

  public onLessonInstanceClick(lessonInstance: LessonInstance) {
    this.lessonInstanceClickEventEmitter.emit(lessonInstance);
  }
}
