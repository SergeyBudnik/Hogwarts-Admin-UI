import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ExistingStudentPayment, Group, Month, StaffMember, Student, StudentAttendance} from '../../../../../../../data';
import {DatesUtils} from '../../../../../../../utils/dates-utils';
import {LessonsInstanceService, TranslationService} from '../../../../../../../service';
import {DatesDayUtils} from '../../../../../../../utils/dates-day-utils';
import {StudentCardManagementMonthAndYear} from '../../student-card-management.page';
import {StudentCardManagementMonth} from '../../data/student-card-management-month';
import {StudentCardManagementDay} from '../../data/student-card-management-day';
import {StudentCardManagementWeek} from '../../data/student-card-management-week';
import {LessonInstance} from '../../../../../../../data/lesson-instance';
import {StudentCardManagementCalendarViewData} from './student-card-management-calendar.view.data';

@Component({
  selector: 'app-student-card-management-calendar',
  templateUrl: './student-card-management-calendar.view.html',
  styleUrls: ['./student-card-management-calendar.view.less']
})
export class StudentCardManagementCalendarView {
  public months: Array<StudentCardManagementMonth> = [];

  public constructor(
    private translationService: TranslationService,
    private lessonsInstanceService: LessonsInstanceService
  ) {}

  @Output("onRequestAddPayment")
  public requestAddPaymentEventEmitter: EventEmitter<any> = new EventEmitter();
  @Output("onLessonInstanceClick")
  public lessonInstanceClickEventEmitter: EventEmitter<LessonInstance> = new EventEmitter();

  @Input("data") set setData(data: StudentCardManagementCalendarViewData) {
    this.months = this.getMonths(data);
  }

  public onRequestAddPayment() {
    this.requestAddPaymentEventEmitter.emit(null);
  }

  public onLessonInstanceClick(lessonInstance: LessonInstance) {
    this.lessonInstanceClickEventEmitter.emit(lessonInstance);
  }

  private getMonthsInfo(): Array<StudentCardManagementMonthAndYear> {
    return [
      { month: 'SEP', year: 2022 },
      { month: 'OCT', year: 2022 },
      { month: 'NOV', year: 2022 },
      { month: 'DEC', year: 2022 },
      { month: 'JAN', year: 2023 },
      { month: 'FEB', year: 2023 },
      { month: 'MAR', year: 2023 },
      { month: 'APR', year: 2023 },
      { month: 'MAY', year: 2023 }
    ]
  }

  private getMonths(
    data: StudentCardManagementCalendarViewData
  ): Array<StudentCardManagementMonth> {
    const result = new Array<StudentCardManagementMonth>();

    this.getMonthsInfo().forEach(month => {
      result.push(
        this.getMonth(
          month.year,
          month.month,
          data.student,
          data.groups,
          data.studentAttendances,
          data.studentPayments,
          data.staffMembers)
      );
    });

    return result;
  }

  private getMonth(
    year: number,
    month: Month,
    student: Student,
    groups: Array<Group>,
    attendances: Array<StudentAttendance>,
    payments: Array<ExistingStudentPayment>,
    staffMembers: Array<StaffMember>
  ): StudentCardManagementMonth {
    const date = DatesUtils.buildDateYMDFromYMD(
      year,
      DatesUtils.monthIndex(month),
      1
    );

    const offset = this.getOffset(date);

    const monthLength = DatesUtils.monthLength(year, month);

    const weeks = new Array<StudentCardManagementWeek>();

    for (let i = 0; i < monthLength;) {
      let week = this.getWeek(year, month, i, offset, monthLength, student, groups, attendances);

      weeks.push(week);

      if (i === 0) {
        i += 7 - offset;
      } else {
        i += 7;
      }
    }

    return {
      name: `${this.translationService.month().translate(month)} ${year}`,
      weeks: weeks,
      payments: this.getMonthPayments(year, month, payments),
      staffMembers: staffMembers
    }
  }

  private getMonthPayments(
    year: number,
    month: Month,
    payments: Array<ExistingStudentPayment>
  ): Array<ExistingStudentPayment> {
    const monthStart = DatesUtils.monthStart(year, month);
    const monthFinish = DatesUtils.monthFinish(year, month);

    return payments.filter(payment =>
      monthStart <= payment.info.time && payment.info.time <= monthFinish
    );
  }

  private getOffset(date: Date): number {
    const day = date.getDay();

    if (day === 0) {
      return 6;
    } else {
      return day - 1;
    }
  }

  private getWeek(
    year: number,
    month: Month,
    dayInMonthIndex: number,
    offset: number,
    monthLength: number,
    student: Student,
    groups: Array<Group>,
    attendances: Array<StudentAttendance>
  ): StudentCardManagementWeek {
    const days = new Array<StudentCardManagementDay>();

    const weekLength = 7;

    let j = 0;

    if (dayInMonthIndex === 0) {
      for (; j < offset; j++) {
        days.push(null);
      }

      for (; j < weekLength; j++, dayInMonthIndex++) {
        days.push(this.getDay(year, month, dayInMonthIndex, student, groups, attendances));
      }
    } else {
      for (; j < weekLength && dayInMonthIndex < monthLength; j++, dayInMonthIndex++) {
        days.push(this.getDay(year, month, dayInMonthIndex, student, groups, attendances));
      }

      for (; j < weekLength; j++) {
        days.push(null);
      }
    }

    return { days: days };
  }

  private getDay(
    year: number,
    month: Month,
    dayInMonthIndex: number,
    student: Student,
    groups: Array<Group>,
    attendances: Array<StudentAttendance>
  ): StudentCardManagementDay {
    const dayStart = DatesDayUtils.getDayStart(year, month, dayInMonthIndex);
    const dayFinish = DatesDayUtils.getDayFinish(year, month, dayInMonthIndex);

    const lessonsInstances = this.lessonsInstanceService.getLessonsInstances(
      student,
      groups,
      attendances,
      dayStart,
      dayFinish,
      new Date().getTime()
    );

    return {
      name: `${dayInMonthIndex + 1}`,
      lessons: lessonsInstances
    };
  }
}
