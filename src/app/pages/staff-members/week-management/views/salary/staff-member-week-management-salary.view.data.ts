import {DayOfWeek, StaffMemberAction} from '../../../../../data';

export type StaffMemberWeekManagementSalaryViewData = {
  actions: Map<DayOfWeek, Array<StaffMemberAction>>
}
