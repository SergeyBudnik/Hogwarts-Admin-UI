import {DayOfWeek, StaffMemberAction} from '../../../../../data';

export type StaffMemberWeekManagementActionsViewData = {
  actions: Map<DayOfWeek, Array<StaffMemberAction>>
}
