import {Injectable} from '@angular/core';
import {Group, Student, StudentGroup} from '../data';

@Injectable()
export class StudentGroupsService {
  public getActiveStudentGroups(student: Student, time: number): Array<StudentGroup> {
    const activeStudentGroups: Array<StudentGroup> = [];

    student.studentGroups
      .filter(studentGroup => this.isStudentGroupActive(time, studentGroup))
      .forEach(studentGroup => activeStudentGroups.push(studentGroup));

    return activeStudentGroups;
  }

  public getActiveGroups(student: Student, groups: Array<Group>, time: number): Array<Group> {
    return this.getActiveStudentGroups(student, time)
      .map(studentGroup => groups.find(group => group.id === studentGroup.groupId))
      .filter(group => group != null);
  }

  private isStudentGroupActive(time: number, studentGroup: StudentGroup): boolean {
    const startTimeMatches = studentGroup.startTime < time;
    const finishTimeMatches = !studentGroup.finishTime || time < studentGroup.finishTime;

    return startTimeMatches && finishTimeMatches;
  }
}
