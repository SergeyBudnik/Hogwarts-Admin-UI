export type StaffMemberAction = {
  staffMemberLogin: string,
  startTime: number,
  finishTime: number
  type: StaffMemberActionType,
  price: number
  status: StaffMemberActionStatus
};

export type StaffMemberActionType = 'ROAD' | 'LESSON_CABINET' | 'LESSON_ONLINE';
export type StaffMemberActionStatus = 'FINISHED' | 'CANCELED' | 'NOT_FILLED' | 'FUTURE';
