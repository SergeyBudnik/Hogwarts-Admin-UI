import {Component} from '@angular/core';
import {LoginService, NavigationService} from '../../../../service';
import {ActivatedRoute} from '@angular/router';
import {StaffMemberCardManagementMonthViewData} from './views/month/staff-member-card-management-month.view.data';
import {StaffMembersWeekStatusesHttp} from '../../../../http';
import {Month, StaffMemberWeekStatusType} from '../../../../data';

@Component({
  selector: 'app-staff-member-management-page',
  templateUrl: './staff-member-card-management.page.html',
  styleUrls: ['./staff-member-card-management.page.less']
})
export class StaffMemberCardManagementPageComponent {
  public loadingInProgress = true;

  public login: string = null;
  public months: Array<Array<StaffMemberCardManagementMonthViewData>> = [];

  public constructor(
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private staffMembersWeeksStatusesHttp: StaffMembersWeekStatusesHttp
  ) {
    this.loginService.ifAuthenticated(() => {
      this.route.paramMap.subscribe(params => {
        const login = params.get('login');

        this.login = login;

        staffMembersWeeksStatusesHttp.getAll(login).then((statuses) => {
          this.months = StaffMemberCardManagementPageComponent.getMonths(
            login,
            statuses
          );

          this.loadingInProgress = false;
        });
      });
    });
  }

  private static getMonths(
    login: string,
    statuses: Map<number, Map<Month, Map<number, StaffMemberWeekStatusType>>>
  ): Array<Array<StaffMemberCardManagementMonthViewData>> {
    return [
      [
        StaffMemberCardManagementPageComponent.getMonth(login, 'SEP', 2021, statuses),
        StaffMemberCardManagementPageComponent.getMonth(login, 'OCT', 2021, statuses),
        StaffMemberCardManagementPageComponent.getMonth(login, 'NOV', 2021, statuses)
      ],
      [
        StaffMemberCardManagementPageComponent.getMonth(login, 'DEC', 2021, statuses),
        StaffMemberCardManagementPageComponent.getMonth(login, 'JAN', 2022, statuses),
        StaffMemberCardManagementPageComponent.getMonth(login, 'FEB', 2022, statuses),
      ],
      [
        StaffMemberCardManagementPageComponent.getMonth(login, 'MAR', 2022, statuses),
        StaffMemberCardManagementPageComponent.getMonth(login, 'APR', 2022, statuses),
        StaffMemberCardManagementPageComponent.getMonth(login, 'MAY', 2022, statuses),
      ]
    ];
  }

  private static getMonth(
    login: string,
    month: Month,
    year: number,
    statuses: Map<number, Map<Month, Map<number, StaffMemberWeekStatusType>>>
  ): StaffMemberCardManagementMonthViewData {
    let weekStatuses: Map<number, StaffMemberWeekStatusType> = statuses.get(year).get(month);

    if (!weekStatuses) {
      weekStatuses = new Map();
    }

    return {
      login: login,
      month: month,
      year: year,
      weeksStatuses: StaffMemberCardManagementPageComponent.getMonthWeeksStatuses(
        weekStatuses
      )
    };
  }

  private static getMonthWeeksStatuses(
    statuses: Map<number, StaffMemberWeekStatusType>
  ): Array<StaffMemberWeekStatusType> {
    const res: Array<StaffMemberWeekStatusType> = [];

    let weekIndex = 0;

    while (true) {
      if (statuses.has(weekIndex)) {
        res.push(statuses.get(weekIndex));
      } else {
        break;
      }

      weekIndex++;
    }

    return res;
  }
}
