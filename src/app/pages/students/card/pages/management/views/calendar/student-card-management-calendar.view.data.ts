import {ExistingStudentPayment, Group, StaffMember, Student, StudentAttendance} from '../../../../../../../data';

export type StudentCardManagementCalendarViewData = {
  student: Student,
  studentAttendances: Array<StudentAttendance>,
  studentPayments: Array<ExistingStudentPayment>,
  staffMembers: Array<StaffMember>,
  groups: Array<Group>
}
