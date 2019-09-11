import {Age, Cabinet, EducationLevel, Group, Student, Teacher} from '../data';
import {Injectable} from '@angular/core';

@Injectable()
export class GroupService {
  public getMatchingGroups(groups: Array<Group>, age: Age, educationLevel: EducationLevel): Array<Group> {
    return groups
      .filter(group => group.age === age)
      .filter(group => group.educationLevel === educationLevel)
  }

  public getGroupCabinet(group: Group, allCabinets: Array<Cabinet>): Cabinet {
    return allCabinets.find(cabinet => cabinet.id === group.cabinetId);
  }

  public getGroupActiveStudents(group: Group, allStudents: Array<Student>): Array<Student> {
    return allStudents
      .filter(student => !!student.studentGroups.map(it => it.groupId).find(studentGroupId => studentGroupId == group.id))
      .filter(student => student.statusType == 'STUDYING');
  }

  public isGroupActive(group: Group, allStudents: Array<Student>, time: number): boolean {
    return this.isGroupHasActiveLessons(group, time) && this.getGroupActiveStudents(group, allStudents).length !== 0;
  }

  public isGroupHasActiveLessons(group: Group, time: number): boolean {
    return group
      .lessons
      .map(lesson => {
        const creationTimeMatches = lesson.creationTime <= time;
        const deactivationTimeMatches = !lesson.deactivationTime || time <= lesson.deactivationTime;

        return creationTimeMatches && deactivationTimeMatches;
      })
      .reduce((previousValue, currentValue) => {
        return !!previousValue || !!currentValue;
      }, false);
  }

  public getGroupName(teacher: Teacher, groupStudents: Array<Student>): string {
    if (!teacher) {
      return ""
    } else {
      return `${teacher.name} - ${this.getGroupStudentsNames(groupStudents)}`;
    }
  }

  private getGroupStudentsNames(groupStudents: Array<Student>): String {
    if (groupStudents.length == 0) {
      return 'Нет студентов';
    } else {
      return groupStudents
        .map(it => it.name)
        .map(it => it.split(' ')[0]).reduce((n1, n2) => `${n1}; ${n2}`);
    }
  }
}
