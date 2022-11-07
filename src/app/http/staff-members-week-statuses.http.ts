import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpConfig} from './http-config';
import {Month, StaffMemberWeekStatus, StaffMemberWeekStatusType} from '../data';
import {MonthAndYear} from '../data/month-and-year';

@Injectable()
export class StaffMembersWeekStatusesHttp {
  private root = `${HttpConfig.getBackendRoot()}/admin/staff-members/week-statuses`;

  public constructor(
    readonly http: HttpClient
  ) {}

  public getAll(staffMemberLogin: string): Promise<Map<number, Map<Month, Map<number, StaffMemberWeekStatusType>>>> {
    return this.http.get<any>(
      `${this.root}/${staffMemberLogin}`
    ).toPromise().then((yearMapJson) => {
      const res: Map<number, Map<Month, Map<number, StaffMemberWeekStatusType>>> = new Map();

      for (const yearJson in yearMapJson) {
        if (yearMapJson.hasOwnProperty(yearJson)) {
          const year = Number(yearJson);
          const monthMapJson = yearMapJson[yearJson];

          const monthToWeekMap: Map<Month, Map<number, StaffMemberWeekStatusType>> = new Map();

          for (const monthJson in monthMapJson) {
            if (monthMapJson.hasOwnProperty(monthJson)) {
              const month = monthJson as Month;
              const weekIndexMapJson = monthMapJson[monthJson];

              const weekToStatusTypeMap: Map<number, StaffMemberWeekStatusType> = new Map();

              for (const weekIndexJson in weekIndexMapJson) {
                if (weekIndexMapJson.hasOwnProperty(weekIndexJson)) {
                  const weekIndex = Number(weekIndexJson);
                  const statusType = weekIndexMapJson[weekIndexJson] as StaffMemberWeekStatusType;

                  weekToStatusTypeMap.set(weekIndex, statusType);
                }
              }

              monthToWeekMap.set(month, weekToStatusTypeMap);
            }
          }

          res.set(year, monthToWeekMap);
        }
      }

      return res;
    });
  }

  public get(staffMemberLogin: string, year: number, month: Month, weekIndex: number): Promise<StaffMemberWeekStatusType> {
    return this.http.get<StaffMemberWeekStatusType>(
      `${this.root}/${staffMemberLogin}/${year}/${month}/${weekIndex}`
    ).toPromise();
  }

  public set(staffMemberWeekStatus: StaffMemberWeekStatus): Promise<void> {
    return this.http.post(`${this.root}/`, staffMemberWeekStatus).toPromise().then(() => {});
  }
}
