import {ExistingStudentPayment, Group, StudentAttendance} from '../../../../../../../data';

export type StudentCardManagementInfoViewData = {
  attendances: Array<StudentAttendance>;
  payments: Array<ExistingStudentPayment>;
  groups: Array<Group>;
}
