import {Component} from '@angular/core';
import {Group, Lesson, StaffMember} from '../../../../data';
import {ActivatedRoute} from '@angular/router';
import {LoginService} from '../../../../service';
import {GroupsHttp, StaffMembersHttp} from '../../../../http';
import {endOfWeek, startOfWeek} from 'date-fns';

@Component({
  selector: 'app-staff-member-timetable-page',
  templateUrl: './staff-member-card-timetable.page.html',
  styleUrls: ['./staff-member-card-timetable.page.less']
})
export class StaffMemberCardTimetablePageComponent {
  public teacher: StaffMember = new StaffMember();
  public teacherGroups: Array<Group> = [];
  public teacherLessons: Array<Lesson> = [];

  private allGroups = [];

  public loadingInProgress = true;

  public constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private staffMembersHttp: StaffMembersHttp,
    private groupsHttp: GroupsHttp
  ) {
    this.loginService.ifAuthenticated(() => {
      this.route.paramMap.subscribe(params => {
        const teacherLogin = params.get('login');

        this.load(teacherLogin);
      });
    });
  }

  public onWeekChanged(currentWeek: number) {
    const time = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000 * currentWeek);

    this.initTimetable(time);
  }

  private load(login: string) {
    Promise.all([
      this.staffMembersHttp.getStaffMember(login),
      this.groupsHttp.getAllGroups()
    ]).then(it => {
      this.teacher = it[0];
      this.allGroups = it[1];

      this.initTimetable(new Date());

      this.loadingInProgress = false;
    });
  }

  private initTimetable(time: Date): void {
    const options = {weekStartsOn: 1};

    const weekStartTime = startOfWeek(time, options).getTime() + 9 * 60 * 60 * 1000;
    const weekEndTime = endOfWeek(time, options).getTime() + 9 * 60 * 60 * 1000;

    const teacherGroups: Array<Group> = [];
    const teacherLessons: Array<Lesson> = [];

    this.allGroups.forEach(group => {
      teacherGroups.push(group);

      group
        .lessons
        .filter(lesson => lesson.creationTime <= weekStartTime)
        .filter(lesson => !lesson.deactivationTime || weekEndTime <= lesson.deactivationTime)
        .filter(it => it.teacherLogin === this.teacher.login)
        .forEach(lesson => teacherLessons.push(lesson));
    });

    this.teacherGroups = teacherGroups;
    this.teacherLessons = teacherLessons;
  }
}
