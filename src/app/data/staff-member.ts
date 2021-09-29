import {Person} from './person';

export class StaffMember {
  constructor(
    public login: string = '',
    public person: Person = new Person(),
    public active: boolean = true,
    public salaryIn30m: number = 0,
    public roles: StaffMemberRoles = new StaffMemberRoles(),
    public subscriptions: StaffMemberSubscriptions = new StaffMemberSubscriptions()
  ) {}
}

export class StaffMemberSubscriptions {
  constructor(
    public freeLessonRequest: Boolean = false
  ) {}
}

export class StaffMemberRoles {
  constructor(
    public teacher: Boolean = false
  ) {}
}
