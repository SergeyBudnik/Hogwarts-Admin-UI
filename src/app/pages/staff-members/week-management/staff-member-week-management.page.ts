import {Component} from '@angular/core';
import {StaffMemberWeekManagementPaymentsData} from './views/payments/staff-member-week-management-payments.data';
import {StaffMembersActionsHttp, StaffMembersHttp, StaffMembersWeekStatusesHttp, StudentPaymentHttp, StudentsHttp} from '../../../http';
import {LoginService} from '../../../service';
import {ActivatedRoute} from '@angular/router';
import {DatesUtils} from '../../../utils/dates-utils';
import {StaffMemberWeekManagementTotalViewData} from './views/total/staff-member-week-management-total.view.data';
import {DayOfWeek, ExistingStudentPayment, Month, StaffMemberAction, StaffMemberWeekStatusType, Student} from '../../../data';
import {StaffMemberWeekManagementActionsViewData} from './views/actions/staff-member-week-management-actions.view.data';

@Component({
  selector: 'app-staff-member-week-management-page',
  templateUrl: './staff-member-week-management.page.html',
  styleUrls: ['./staff-member-week-management.page.less']
})
export class StaffMemberWeekManagementPageComponent {
  public loadingInProgress = true;

  public totalData: StaffMemberWeekManagementTotalViewData = {
    payments: [],
    actions: new Map(),
    statusType: 'OPENED'
  }

  public actionsViewData: StaffMemberWeekManagementActionsViewData = {
    actions: new Map()
  }

  public paymentsData: StaffMemberWeekManagementPaymentsData = {
    payments: [],
    students: [],
  };

  private login: string = '';
  private startTime: number = 0;
  private finishTime: number = 0;
  private weekIndex: number = 0;
  private month: Month = 'JAN';
  private year: number = 0;
  private actions: Map<DayOfWeek, Array<StaffMemberAction>> = new Map();
  private payments: Array<ExistingStudentPayment> = [];
  private students: Array<Student> = [];
  private statusType: StaffMemberWeekStatusType = 'OPENED';

  public constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private studentsHttp: StudentsHttp,
    private studentPaymentsHttp: StudentPaymentHttp,
    private staffMembersHttp: StaffMembersHttp,
    private staffMembersWeeksStatusesHttp: StaffMembersWeekStatusesHttp,
    private staffMembersActionsHttp: StaffMembersActionsHttp,
  ) {
    this.loginService.ifAuthenticated(() => {
      this.route.paramMap.subscribe(params => {
        const login = params.get('login');
        const year = Number(params.get('year'));
        const monthIndex = Number(params.get('month'));
        const weekIndex = Number(params.get('weekIndex'));

        const month = DatesUtils.monthByIndex(monthIndex);

        this.login = login;

        this.weekIndex = weekIndex;
        this.month = month;
        this.year = year;

        this.startTime = StaffMemberWeekManagementPageComponent.getStartTime(weekIndex, month, year);
        this.finishTime = StaffMemberWeekManagementPageComponent.getFinishTime(weekIndex, month, year);

        Promise.all([
          this.studentPaymentsHttp.getAllPayments(),
          this.studentsHttp.getAllStudents(),
          this.staffMembersActionsHttp.getWeekActions(
            login,
            weekIndex,
            month,
            year
          ),
          this.staffMembersWeeksStatusesHttp.get(login, year, month, weekIndex)
        ]).then(it => {
          const payments = it[0]
            .filter(payment => payment.info.staffMemberLogin === login)
            .filter(payment => this.startTime <= payment.info.time)
            .filter(payment => payment.info.time <= this.finishTime);

          this.students = it[1];
          this.actions = it[2];
          this.statusType = it[3];
          this.payments = payments;

          this.modifyViewsData();

          this.loadingInProgress = false;
        });
      });
    });
  }

  public modifyWeekStatus(statusType: StaffMemberWeekStatusType) {
    this.staffMembersWeeksStatusesHttp.set(
      {
        id: {
          staffMemberLogin: this.login,
          weekIndex: this.weekIndex,
          month: this.month,
          year: this.year
        },
        type: statusType
      }
    ).then(() => {
      this.statusType = statusType;

      this.modifyViewsData();
    });
  }

  public processPayment(payment: ExistingStudentPayment) {
    this.payments = this.payments.map(it => {
      if (it.id === payment.id) {
        return payment;
      } else {
        return it;
      }
    });

    this.modifyViewsData();
  }

  public deletePayment(id: number) {
    this.payments = this.payments.filter(it => it.id !== id);

    this.modifyViewsData();
  }

  private modifyViewsData() {
    this.totalData = {
      actions: this.actions,
      payments: this.payments,
      statusType: this.statusType
    };

    this.actionsViewData = {
      actions: this.actions
    }

    this.paymentsData = {
      payments: this.payments,
      students: this.students,
    };
  }

  private static getStartTime(weekIndex: number, month: Month, year: number): number {
    let dateOfMonth = 1;

    for (let i = 0; i < weekIndex; i++) {
      const dayOfWeek = DatesUtils.buildDateYMDFromYMD(
        year,
        DatesUtils.monthIndex(month),
        dateOfMonth
      ).getDay();

      dateOfMonth += (dayOfWeek === 0) ? 1 : 8 - dayOfWeek;
    }

    return DatesUtils.buildDateYMDFromYMD(
      year,
      DatesUtils.monthIndex(month),
      dateOfMonth
    ).getTime();
  }

  private static getFinishTime(weekIndex: number, month: Month, year: number): number {
    let dateOfMonth = 1;

    for (let i = 0; i < weekIndex; i++) {
      const dayOfWeek = DatesUtils.buildDateYMDFromYMD(
        year,
        DatesUtils.monthIndex(month),
        dateOfMonth
      ).getDay();

      dateOfMonth += (dayOfWeek === 0) ? 1 : 8 - dayOfWeek;
    }

    return DatesUtils.buildDateYMDFromYMD(
      year,
      DatesUtils.monthIndex(month),
      dateOfMonth + 7
    ).getTime();
  }
}
