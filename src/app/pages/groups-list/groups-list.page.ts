import {Component} from '@angular/core';
import {Group, Student} from '../../data';
import {CabinetsService, GroupsService, LoginService, StudentsService} from '../../service';
import {Router} from '@angular/router';
import {TranslatableComponent} from '../../translation/translation.component';
import {Age, AgeUtils} from '../../data';
import {EducationLevel, EducationLevelUtils} from '../../data';
import {Cabinet} from '../../data';
import {SelectItem} from '../../controls/select-item';

@Component({
  selector: 'app-groups-list-page',
  templateUrl: './groups-list.page.html',
  styleUrls: ['./groups-list.page.less']
})
export class GroupsListPageComponent extends TranslatableComponent {
  private students: Array<Student> = [];

  public groups: Array<Group> = [];
  public cabinets: Array<Cabinet> = [];

  public nameFilter: string = '';
  public ageFilter: Age = 'UNKNOWN';
  public educationLevelFilter: EducationLevel = 'UNKNOWN';
  public cabinetFilter: number = null;

  public loadingInProgress = true;

  private unfilteredGroups: Array<Group> = [];

  public constructor(
    private router: Router,
    private loginService: LoginService,
    private groupsService: GroupsService,
    private cabinetsService: CabinetsService,
    private studentsService: StudentsService
  ) {
    super();

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      Promise.all([
        this.groupsService.getAllGroups(),
        this.cabinetsService.getAllCabinets(),
        this.studentsService.getAllStudents()
      ]).then(it => {
        this.unfilteredGroups = it[0];
        this.cabinets = it[1];
        this.students = it[2];

        this.loadingInProgress = false;

        this.groups = this.getFilteredGroups();
      });
    }
  }

  public groupHasActiveStudents(groupId: number): boolean {
    let amountOfActiveStudents = this.students
      .filter(student => !!student.groupIds.find(studentGroupId => studentGroupId == groupId))
      .filter(student => student.statusType == 'GROUP_ASSIGNED')
      .length;

    return amountOfActiveStudents !== 0;
  }

  public getCabinetItems(): Array<SelectItem> {
    const res = [new SelectItem('Все', null)];

    this.cabinets.forEach(it => res.push(new SelectItem(it.name, String(it.id))));

    return res;
  }

  public onNameFilterChange(nameFilter: string): void {
    this.nameFilter = nameFilter;
    this.groups = this.getFilteredGroups();
  }

  public getAgeItems(): Array<SelectItem> {
    return AgeUtils.values.map(it =>
      new SelectItem(it === 'UNKNOWN' ? 'Все' : this.getAgeTranslationAsGroup(it), it)
    );
  }

  public onAgeFilterChange(ageFilter: Age): void {
    this.ageFilter = ageFilter;
    this.groups = this.getFilteredGroups();
  }

  public getEducationLevelItems(): Array<SelectItem> {
    return EducationLevelUtils.values.map(it =>
      new SelectItem(it === 'UNKNOWN' ? 'Все' : this.getEducationLevelTranslation(it), it)
    );
  }

  public onEducationLevelFilterChange(educationLevelFilter: EducationLevel): void {
    this.educationLevelFilter = educationLevelFilter;
    this.groups = this.getFilteredGroups();
  }

  public onCabinetFilterChange(cabinetFilter: string): void {
    this.cabinetFilter = Number(cabinetFilter);
    this.groups = this.getFilteredGroups();
  }

  public openGroupPage(groupId: number): void {
    this.router.navigate([`/groups/${groupId}/information`]);
  }

  public openNewGroupPage() {
    this.router.navigate([`/groups/new/information`]);
  }

  private getFilteredGroups(): Array<Group> {
    return this.unfilteredGroups
      .filter(it => it.name.indexOf(this.nameFilter) !== -1)
      .filter(it => this.ageFilter === 'UNKNOWN' || it.age === this.ageFilter)
      .filter(it => this.educationLevelFilter === 'UNKNOWN' || it.educationLevel === this.educationLevelFilter)
      .filter(it => !this.cabinetFilter || it.cabinetId === this.cabinetFilter)
      .sort((o1, o2) => o1.id - o2.id);
  }
}
