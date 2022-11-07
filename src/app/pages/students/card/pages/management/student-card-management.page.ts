import {Component} from '@angular/core';
import {Month, Student, ExistingStudentPayment, StaffMember, StudentAttendance, Group} from '../../../../../data';
import {GroupsHttp, StaffMembersHttp, StudentAttendanceHttp, StudentPaymentHttp, StudentsHttp} from '../../../../../http';
import {LoginService} from '../../../../../service';
import {ActivatedRoute} from '@angular/router';
import {LessonInstance} from '../../../../../data/lesson-instance';
import {
  StudentCardManagementModifyAttendancePopupManager,
} from './views/modify-attendance/student-card-management-modify-attendance.view';
import {StudentCardManagementCalendarViewData} from './views/calendar/student-card-management-calendar.view.data';
import {StudentCardManagementInfoViewData} from './views/info/student-card-management-info.view.data';
import { StudentCardManagementAddPaymentPopupManager } from 'app/pages';

@Component({
  selector: 'app-student-card-management-page',
  templateUrl: './student-card-management.page.html',
  styleUrls: ['./student-card-management.page.less']
})
export class StudentCardManagementPage {
  public loadingInProgress = true;

  public student: Student = Student.createNew();
  public infoData: StudentCardManagementInfoViewData = null;
  public calendarData: StudentCardManagementCalendarViewData = null;

  private studentPayments: Array<ExistingStudentPayment> = [];
  private studentAttendances: Array<StudentAttendance> = [];
  private groups: Array<Group> = [];

  private staffMembers: Array<StaffMember> = [];

  public constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private studentsHttp: StudentsHttp,
    private groupsHttp: GroupsHttp,
    private studentPaymentsHttp: StudentPaymentHttp,
    private studentAttendanceHttp: StudentAttendanceHttp,
    private staffMembersHttp: StaffMembersHttp
  ) {
    this.loginService.ifAuthenticated(() => {
      this.parseParams((studentLogin) => {
        this.initData(studentLogin);
      });
    });
  }

  public onRequestAddPayment() {
    StudentCardManagementAddPaymentPopupManager.show(
      this.student.login,
      this.staffMembers
    );
  }

  public onLessonInstanceClick(lessonInstance: LessonInstance) {
    StudentCardManagementModifyAttendancePopupManager.show({
        lessonInstance: lessonInstance
    });
  }

  public onPaymentAdded(payment: ExistingStudentPayment) {
    this.studentPayments.push(payment);

    this.calendarData = {
      student: this.student,
      studentAttendances: this.studentAttendances,
      studentPayments: this.studentPayments,
      staffMembers: this.staffMembers,
      groups: this.groups
    };
  }

  private initData(studentLogin: string) {
    Promise.all([
      this.studentsHttp.getStudent(studentLogin),
      this.studentAttendanceHttp.getAttendances(studentLogin),
      this.studentPaymentsHttp.getPayments(studentLogin),
      this.staffMembersHttp.getAllStaffMembers(),
      this.groupsHttp.getAllGroups()
    ]).then(it => {
      const student = it[0];
      const studentAttendances = it[1];
      const studentPayments = it[2];
      const staffMembers = it[3];
      const groups = it[4];

      this.student = student;
      this.staffMembers = staffMembers;
      this.studentPayments = studentPayments;
      this.studentAttendances = studentAttendances;
      this.groups = groups;

      this.infoData = {
        attendances: studentAttendances,
        payments: studentPayments,
        groups: groups
      };

      this.calendarData = {
        student: student,
        studentAttendances: studentAttendances,
        studentPayments: studentPayments,
        staffMembers: staffMembers,
        groups: groups
      };

      this.loadingInProgress = false;
    });
  }

  private parseParams(onStudent: (studentLogin: string) => any) {
    this.route.paramMap.subscribe(params => {
      const login = params.get('login');

      onStudent(login);
    });
  }
}

export interface StudentCardManagementMonthAndYear {
  month: Month;
  year: number;
}
