import {ExistingStudentPayment, StaffMember} from '../../../../../data';

export type StaffMemberWeekManagementPaymentsData = {
  staffMembers: Array<StaffMember>, // todo: drop
  payments: Array<ExistingStudentPayment>
}
