import {Month, StaffMemberWeekStatusType} from '../../../../../../data';

export type StaffMemberCardManagementMonthViewData = {
  login: string,
  month: Month,
  year: number,
  weeksStatuses: Array<StaffMemberWeekStatusType>
}
