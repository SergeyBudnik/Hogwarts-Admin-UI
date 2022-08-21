import {Component} from '@angular/core';
import {StaffMemberWeekManagementPaymentsData} from './views/payments/staff-member-week-management-payments.data';
import {StaffMembersActionsHttp, StaffMembersHttp, StaffMembersWeekStatusesHttp, StudentPaymentHttp} from '../../../http';
import {LoginService} from '../../../service';
import {ActivatedRoute} from '@angular/router';
import {DatesUtils} from '../../../utils/dates-utils';
import {StaffMemberWeekManagementTotalViewData} from './views/total/staff-member-week-management-total.view.data';
import {Month} from '../../../data';
import {StaffMemberWeekManagementSalaryViewData} from './views/salary/staff-member-week-management-salary.view.data';

@Component({
  selector: 'app-staff-member-week-management-page',
  templateUrl: './staff-member-week-management.page.html',
  styleUrls: ['./staff-member-week-management.page.less']
})
export class StaffMemberWeekManagementPageComponent {
  public totalData: StaffMemberWeekManagementTotalViewData = {
    payments: [],
    actions: new Map()
  }

  public salaryData: StaffMemberWeekManagementSalaryViewData = {
    actions: new Map()
  }

  public paymentsData: StaffMemberWeekManagementPaymentsData = {
    payments: [],
    staffMembers: [],
  };

  private login: string = '';
  private startTime: number = 0;
  private finishTime: number = 0;
  private weekIndex: number = 0;
  private month: Month = 'JAN';
  private year: number = 0;

  public constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private studentPaymentsHttp: StudentPaymentHttp,
    private staffMembersHttp: StaffMembersHttp,
    private staffMembersWeeksStatusesHttp: StaffMembersWeekStatusesHttp,
    private staffMembersActionsHttp: StaffMembersActionsHttp
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

        this.startTime = this.getStartTime(weekIndex, month, year);
        this.finishTime = this.getFinishTime(weekIndex, month, year);

        Promise.all([
          this.studentPaymentsHttp.getAllPayments(),
          this.staffMembersHttp.getAllStaffMembers(),
          this.staffMembersActionsHttp.getWeekActions(
            login,
            weekIndex,
            month,
            year
          )
        ]).then(it => {
          const payments = it[0]
            .filter(payment => payment.info.staffMemberLogin === login)
            .filter(payment => this.startTime <= payment.info.time)
            .filter(payment => payment.info.time <= this.finishTime);

          const staffMembers = it[1];

          const staffMemberActions = it[2];

          this.totalData = {
            payments: payments,
            actions: staffMemberActions
          }

          this.salaryData = {
            actions: staffMemberActions
          }

          this.paymentsData = {
            payments: payments,
            staffMembers: staffMembers,
          }
        });
      });
    });
  }

  public finishWeek() {
    this.staffMembersWeeksStatusesHttp.set(
      {
        id: {
          staffMemberLogin: this.login,
          weekIndex: this.weekIndex,
          month: this.month,
          year: this.year
        },
        type: 'CLOSED'
      }
    );
  }

  private getStartTime(weekIndex: number, month: Month, year: number): number {
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

  private getFinishTime(weekIndex: number, month: Month, year: number): number {
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
