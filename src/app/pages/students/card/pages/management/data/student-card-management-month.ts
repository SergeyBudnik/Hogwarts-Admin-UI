import {ExistingStudentPayment, StaffMember} from '../../../../../../data';
import {StudentCardManagementWeek} from './student-card-management-week';

export type StudentCardManagementMonth = {
  name: string,
  weeks: Array<StudentCardManagementWeek>,
  payments: Array<ExistingStudentPayment>,
  staffMembers: Array<StaffMember>
}
