import {Month} from './month';

export type StaffMemberWeekStatusId = {
  staffMemberLogin: string,
  weekIndex: number,
  month: Month,
  year: number
}

export type StaffMemberWeekStatusType = 'OPENED' | 'CLOSED';

export type StaffMemberWeekStatus = {
  id: StaffMemberWeekStatusId,
  type: StaffMemberWeekStatusType
};
