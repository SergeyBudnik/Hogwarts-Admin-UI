/* tslint:disable:component-class-suffix */

import {Component} from '@angular/core';
import {StudentsService, LoginService, NavigationService, TranslationService} from '../../../../../service';
import {ActivatedRoute} from '@angular/router';
import {Group, Lesson, Cabinet, StaffMember, Student} from '../../../../../data';
import {CabinetsHttp, GroupsHttp, StaffMembersHttp} from '../../../../../http';
import {GroupLessonInfo} from './data';
import {GroupCardInformationAssignLessonPopupManager} from './views';
import {DatesUtils} from '../../../../../utils/dates-utils';

@Component({
  selector: 'app-group-card-information-page',
  templateUrl: './group-card-information.page.html',
  styleUrls: ['./group-card-information.page.less']
})
export class GroupCardInformationPage {
  private readonly currentTime = null;

  public showInactiveLessons = false;

  public group: Group = new Group();
  public lessons: Array<GroupLessonInfo> = [];
  public students: Array<Student> = [];

  public loadingInProgress = true;

  public teachers: Array<StaffMember> = [];
  public cabinets: Array<Cabinet> = [];

  private static getActiveTeachers(allStaffMembers: Array<StaffMember>): Array<StaffMember> {
    return allStaffMembers
      .filter(it => it.active)
      .filter(it => it.roles.teacher);
  }

  public constructor(
    public translationService: TranslationService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private groupsHttp: GroupsHttp,
    private studentsService: StudentsService,
    private cabinetsHttp: CabinetsHttp,
    private staffMembersHttp: StaffMembersHttp
  ) {
    this.currentTime = new Date().getTime();

    this.loginService.ifAuthenticated(() => {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');

        if (id === 'new') {
          this.initNewGroup();
        } else {
          this.initGroup(Number(id));
        }
      });
    });
  }

  public save(): void {
    this.loadingInProgress = true;

    if (!!this.group.id) {
      this.groupsHttp
        .editGroup(this.group)
        .then(() => this.loadingInProgress = false);
    } else {
      this.groupsHttp
        .createGroup(this.group)
        .then(it => this.navigationService.groups().id(it).information().go());
    }
  }

  public delete(): void {
    this.loadingInProgress = true;

    this.groupsHttp.deleteGroup(this.group.id).then(() => {
      this.navigationService.groups().list().go();
    });
  }

  public toggleInactiveLessons() {
    this.showInactiveLessons = !this.showInactiveLessons;

    this.lessons = this.getGroupLessons();
  }

  public editLesson(groupLessonInfo: GroupLessonInfo) {
    GroupCardInformationAssignLessonPopupManager.pushGroupLesson(
      this.group,
      groupLessonInfo.lesson,
      groupLessonInfo.index,
      (groupLessonInfoToSave) => this.onLessonSaved(groupLessonInfoToSave.lesson, groupLessonInfoToSave.index),
      () => this.onLessonDeleted(groupLessonInfo.index)
    );
  }

  public addLesson() {
    GroupCardInformationAssignLessonPopupManager.pushGroupLesson(
      this.group,
      new Lesson(
        null,
        this.group.headTeacherLogin,
        null,
        false,
        false,
        null,
        null,
        DatesUtils.buildDateYMDFromDate(new Date()).getTime(),
        DatesUtils.buildDateYMDFromDate(new Date()).getTime()
      ),
      null,
      (groupLessonInfo) => this.onLessonSaved(groupLessonInfo.lesson, null),
      () => {}
    );
  }

  public onLessonSaved(lesson: Lesson, lessonIndex: number) {
    if (lessonIndex == null) {
      this.group.lessons.push(lesson);
    } else {
      this.group.lessons[lessonIndex] = lesson;
    }

    this.lessons = this.getGroupLessons();
  }

  private onLessonDeleted(lessonIndex: number) {
    const lessons: Array<Lesson> = [];

    for (let i = 0; i < this.group.lessons.length; i++) {
      if (i !== lessonIndex) {
        lessons.push(this.group.lessons[i]);
      }
    }

    this.group.lessons = lessons;

    this.lessons = this.getGroupLessons();
  }

  private initGroup(groupId: number) {
    this.group.id = groupId;

    Promise.all([
      this.groupsHttp.getGroup(groupId),
      this.studentsService.getGroupStudents(groupId),
      this.cabinetsHttp.getAllCabinets(),
      this.staffMembersHttp.getAllStaffMembers()
    ]).then(it => {
      this.group = it[0];
      this.students = it[1];
      this.cabinets = it[2];
      this.teachers = GroupCardInformationPage.getActiveTeachers(it[3]);

      this.lessons = this.getGroupLessons();

      this.loadingInProgress = false;
    });
  }

  private initNewGroup() {
    Promise.all([
      this.cabinetsHttp.getAllCabinets(),
      this.staffMembersHttp.getAllStaffMembers()
    ]).then(it => {
      this.group = new Group();
      this.students = [];
      this.cabinets = it[0];
      this.teachers = GroupCardInformationPage.getActiveTeachers(it[1]);

      this.loadingInProgress = false;
    });
  }

  private getGroupLessons(): Array<GroupLessonInfo> {
    const groupLessonsInfo = Array<GroupLessonInfo>();

    let index = 0;

    this.group.lessons.forEach(lesson => {
      groupLessonsInfo.push(
        new GroupLessonInfo(
          lesson,
          index,
          this.isGroupLessonVisible(lesson)
        )
      );

      index++;
    });

    return groupLessonsInfo;
  }

  private isGroupLessonVisible(lesson: Lesson): boolean {
    if (this.showInactiveLessons) {
      return true;
    } else {
      const creationTimeMatches = lesson.creationTime <= this.currentTime;
      const deactivationTimeMatches = !lesson.deactivationTime || this.currentTime <= lesson.deactivationTime;

      return creationTimeMatches && deactivationTimeMatches;
    }
  }
}
