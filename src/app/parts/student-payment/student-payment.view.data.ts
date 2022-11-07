import {ExistingStudentPayment, StaffMember, Student} from '../../data';

export type StudentPaymentViewData = {
  payment: ExistingStudentPayment,
  staffMembers: Array<StaffMember>
  students: Array<Student>,
  mode: StudentPaymentModeViewData
}

export type StudentPaymentModeViewData = 'STUDENT' | 'STAFF_MEMBER';
