import {ExistingStudentPayment, Student} from '../../../../../data';

export type StaffMemberWeekManagementPaymentsData = {
  students: Array<Student>,
  payments: Array<ExistingStudentPayment>
}
