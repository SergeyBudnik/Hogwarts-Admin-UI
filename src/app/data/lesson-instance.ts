import {StudentAttendanceType} from './student-attendance';
import {Group} from './group';
import {Lesson} from './lesson';

export type LessonInstance = {
  group: Group,
  lesson: Lesson,
  date: number,
  attendanceType: StudentAttendanceType
}
