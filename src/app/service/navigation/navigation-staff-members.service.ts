import {NavigationExecutor} from './common';
import {Router} from '@angular/router';
import {Month} from '../../data';
import {DatesUtils} from '../../utils/dates-utils';

export class NavigationStaffMembersService {
  constructor(private router: Router) {}

  public list(): NavigationExecutor {
    return new NavigationExecutor(this.router, `staff-members`);
  }

  public new(): NavigationExecutor {
    return new NavigationExecutor(this.router, `staff-members/new/information`);
  }

  public id(login: string): NavigationStaffMemberService {
    return new NavigationStaffMemberService(this.router, login);
  }
}

export class NavigationStaffMemberService {
  constructor(private router: Router, private login: string) {}

  public information(): NavigationExecutor {
    return new NavigationExecutor(
      this.router,
      `staff-members/${this.login}/information`
    );
  }

  public timetable(): NavigationExecutor {
    return new NavigationExecutor(
      this.router,
      `staff-members/${this.login}/timetable`
    );
  }

  public management(): NavigationExecutor {
    return new NavigationExecutor(
      this.router,
      `staff-members/${this.login}/management`
    );
  }

  public managementWeek(year: number, month: Month, weekIndex: number): NavigationExecutor {
    const monthIndex = DatesUtils.monthIndex(month);

    return new NavigationExecutor(
      this.router,
      `staff-members/${this.login}/management/${year}/${monthIndex}/${weekIndex}`
    );
  }
}
