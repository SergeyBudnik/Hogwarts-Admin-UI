import {DayOfWeek, ExistingStudentPayment, StaffMemberAction} from '../../../../../data';

export type StaffMemberWeekManagementTotalViewData = {
  actions: Map<DayOfWeek, Array<StaffMemberAction>>,
  payments: Array<ExistingStudentPayment>
}
