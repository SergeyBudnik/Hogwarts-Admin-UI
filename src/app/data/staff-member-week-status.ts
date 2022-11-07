import {Month} from './month';

export interface StaffMemberWeekStatusId {
  staffMemberLogin: string;
  weekIndex: number;
  month: Month;
  year: number;
}

export type StaffMemberWeekStatusType = 'OPENED' | 'CLOSED' | 'FUTURE';

export interface StaffMemberWeekStatus {
  id: StaffMemberWeekStatusId;
  type: StaffMemberWeekStatusType;
}
