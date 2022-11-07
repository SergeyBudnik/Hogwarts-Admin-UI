import {DayOfWeek, ExistingStudentPayment, StaffMemberAction, StaffMemberWeekStatusType} from '../../../../../data';

export type StaffMemberWeekManagementTotalViewData = {
  actions: Map<DayOfWeek, Array<StaffMemberAction>>,
  payments: Array<ExistingStudentPayment>,
  statusType: StaffMemberWeekStatusType
}
