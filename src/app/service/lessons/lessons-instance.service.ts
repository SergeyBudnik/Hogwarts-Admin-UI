import {Injectable} from '@angular/core';
import {Group, Lesson, Student, StudentAttendance, StudentAttendanceType, TimeUtils} from '../../data';
import {LessonInstance} from '../../data/lesson-instance';
import {DatesDayUtils} from '../../utils/dates-day-utils';
import {GroupService} from '../group.service';
import {StudentGroupsService} from '../student-groups.service';

@Injectable()
export class LessonsInstanceService {
  public constructor(
    private groupsService: GroupService,
    private studentGroupsService: StudentGroupsService
  ) {}

  public getLessonsInstances(
    student: Student,
    groups: Array<Group>,
    attendances: Array<StudentAttendance>,
    dayStartTime: number,
    dayFinishTime: number,
    currentTime: number
  ): Array<LessonInstance> {
    const lessonsInstances: Array<LessonInstance> = [];

    this.studentGroupsService
      .getActiveGroups(student, groups, dayStartTime)
      .forEach(group => {
        const dayOfWeek = DatesDayUtils.getDayOfWeek(dayStartTime);

        this.groupsService
          .getGroupActiveLessons(group, dayStartTime)
          .filter(lesson => lesson.day === dayOfWeek)
          .forEach(lesson =>
            lessonsInstances.push(
              this.getLessonInstance(group, lesson, attendances, dayStartTime, currentTime)
            )
          )
      });

    return lessonsInstances;
  }

  private getLessonInstance(
    group: Group,
    lesson: Lesson,
    attendances: Array<StudentAttendance>,
    dayStartTime: number,
    currentTime: number
  ): LessonInstance {
    return {
      group: group,
      lesson: lesson,
      date: dayStartTime,
      attendanceType: this.getLessonInstanceAttendanceType(
        lesson,
        attendances,
        dayStartTime,
        currentTime
      )
    };
  }

  private getLessonInstanceAttendanceType(
    lesson: Lesson,
    attendances: Array<StudentAttendance>,
    dayStartTime: number,
    currentTime: number
  ): StudentAttendanceType {
    const lessonStartTime = dayStartTime + TimeUtils.getTimeMills(lesson.startTime);
    const lessonFinishTime = dayStartTime + TimeUtils.getTimeMills(lesson.finishTime);

    if (currentTime <= dayStartTime) {
      return null;
    } else {
      const attendance = attendances
        .find(attendance => {
          return lessonStartTime === attendance.startTime && lessonFinishTime === attendance.finishTime;
        });

      if (!attendance) {
        return null;
      } else {
        return attendance.type;
      }
    }
  }
}
