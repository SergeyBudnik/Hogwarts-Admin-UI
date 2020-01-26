import {Component} from '@angular/core';
import {StudentsService, LoginService, NavigationService, TranslationService} from '../../../../../service';
import {ActivatedRoute} from '@angular/router';
import {Group, Student, Lesson, Cabinet, StaffMember} from '../../../../../data';
import {CabinetsHttp, GroupsHttp, StaffMembersHttp} from '../../../../../http';
import {SelectItem} from '../../../../../controls/select-item';
import {GroupCardInformationAssignLessonPopupManager} from './popups';

@Component({
  selector: 'app-group-card-information-page',
  templateUrl: './group-card-information.page.html',
  styleUrls: ['./group-card-information.page.less']
})
export class GroupCardInformationPage {
  public showInactiveLessons = false;

  public group: Group = new Group();
  public lessons: Array<Lesson> = [];
  public students: Array<Student> = [];

  public loadingInProgress = true;

  public staffMembers: Array<StaffMember> = [];
  public cabinets: Array<Cabinet> = [];

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
        .then(it => this.navigationService.groups().id(it).information());
    }
  }

  public delete(): void {
    this.loadingInProgress = true;

    this.groupsHttp.deleteGroup(this.group.id).then(() => {
      this.navigationService.groups().list().go();
    });
  }

  public getStaffMembersItems(): Array<SelectItem> {
    return this.staffMembers.map(it => new SelectItem(it.person.name, it.login));
  }

  public toggleInactiveLessons() {
    this.showInactiveLessons = !this.showInactiveLessons;

    this.lessons = this.getGroupLessons();
  }

  public setExistingModalLesson(lesson: Lesson, index: number) {
    GroupCardInformationAssignLessonPopupManager.pushGroupLesson(
      lesson,
      index,
      (lesson: Lesson) => this.onLessonSaved(lesson, index),
      () => this.onLessonDeleted(index)
    );
  }

  public setNewModalLesson() {
    GroupCardInformationAssignLessonPopupManager.pushGroupLesson(
      new Lesson(),
      null,
      (lesson: Lesson) => this.onLessonSaved(lesson, null),
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
    let lessons: Array<Lesson> = [];

    for (let i = 0; i < this.group.lessons.length; i++) {
      if (i != lessonIndex) {
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
      this.staffMembers = it[3];

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
      this.staffMembers = it[1];

      this.loadingInProgress = false;
    });
  }

  private getGroupLessons(): Array<Lesson> {
    const currentTime = new Date().getTime();

    return this.group.lessons
      .filter(lesson => {
        if (this.showInactiveLessons) {
          return true;
        } else {
          const creationTimeMatches = lesson.creationTime <= currentTime;
          const deactivationTimeMatches = !lesson.deactivationTime || currentTime <= lesson.deactivationTime;

          return creationTimeMatches && deactivationTimeMatches;
        }
      });
  }
}