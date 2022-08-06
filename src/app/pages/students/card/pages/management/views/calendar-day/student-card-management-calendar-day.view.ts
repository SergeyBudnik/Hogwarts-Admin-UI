import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StudentCardManagementDay} from '../../data/student-card-management-day';
import {LessonInstance} from '../../../../../../../data/lesson-instance';

@Component({
  selector: 'app-student-card-management-calendar-day',
  templateUrl: './student-card-management-calendar-day.view.html',
  styleUrls: ['./student-card-management-calendar-day.view.less']
})
export class StudentCardManagementCalendarDayView {
  @Input("day")
  public day: StudentCardManagementDay = null;

  @Output("onLessonInstanceClick")
  public lessonInstanceClickEventEmitter: EventEmitter<LessonInstance> = new EventEmitter<LessonInstance>();

  public onLessonInstanceClick(lessonInstance: LessonInstance) {
    this.lessonInstanceClickEventEmitter.emit(lessonInstance);
  }
}
