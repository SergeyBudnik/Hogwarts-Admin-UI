import {Month, StaffMemberWeekStatusType} from '../../../../../../data';

export interface StaffMemberCardManagementMonthViewData {
  login: string;
  month: Month;
  year: number;
  weeksStatuses: Array<StaffMemberWeekStatusType>;
}
