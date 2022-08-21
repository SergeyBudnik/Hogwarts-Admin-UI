import {Injectable} from '@angular/core';
import {HttpConfig} from './http-config';
import {HttpClient} from '@angular/common/http';
import {DayOfWeek, Month, StaffMemberAction} from '../data';

@Injectable()
export class StaffMembersActionsHttp {
  private root = `${HttpConfig.getBackendRoot()}/admin/staff-members/actions`;

  public constructor(
    readonly http: HttpClient
  ) {}

  public getWeekActions(
    staffMemberLogin: string,
    weekIndex: number,
    month: Month,
    year: number
  ): Promise<Map<DayOfWeek, Array<StaffMemberAction>>> {
    return this.http.get<any>(
      `${this.root}/${staffMemberLogin}/weekIndex/${weekIndex}/month/${month}/year/${year}`
    ).toPromise().then((json) => {
      const res: Map<DayOfWeek, Array<StaffMemberAction>> = new Map();

      for (const value in json) {
        if (json.hasOwnProperty(value)) {
          res.set(value as DayOfWeek, json[value])
        }
      }

      return res;
    });
  }
}
