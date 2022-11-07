import {Component, Input} from '@angular/core';
import {StaffMemberCardManagementWeekViewData} from './staff-member-card-management-week.view.data';

@Component({
  selector: 'app-staff-member-management-week-view',
  templateUrl: './staff-member-card-management-week.view.html',
  styleUrls: ['./staff-member-card-management-week.view.less']
})
export class StaffMemberCardManagementWeekViewComponent {
  public data: StaffMemberCardManagementWeekViewData;

  @Input('data') public set setData(data: StaffMemberCardManagementWeekViewData) {
    this.data = data;

    console.log(`${data.index} ${data.statusType}`);
  }

  public getDatesString(): string {
    return `${this.getDayString(this.data.start)} - ${this.getDayString(this.data.finish)}`;
  }

  private getDayString(day: number): string {
    return (day < 10) ? `0${day}` : `${day}`;
  }
}
