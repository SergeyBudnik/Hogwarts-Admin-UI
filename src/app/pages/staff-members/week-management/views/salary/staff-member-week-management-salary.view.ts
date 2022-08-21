import {Component, Input} from '@angular/core';
import {StaffMemberWeekManagementSalaryDayData} from '../salary-day/staff-member-week-management-salary-day.data';
import {StaffMemberWeekManagementSalaryViewData} from './staff-member-week-management-salary.view.data';
import {DayOfWeek, StaffMemberAction} from '../../../../../data';

@Component({
  selector: 'app-staff-member-week-management-salary-view',
  templateUrl: './staff-member-week-management-salary.view.html',
  styleUrls: ['./staff-member-week-management-salary.view.less']
})
export class StaffMemberWeekManagementSalaryViewComponent {
  private actions: Map<DayOfWeek, Array<StaffMemberAction>> = new Map();

  @Input('data') public set setData(data: StaffMemberWeekManagementSalaryViewData) {
    this.actions = data.actions;
  }

  public getDayData(dayOfWeek: DayOfWeek): StaffMemberWeekManagementSalaryDayData {
    return {
      dayOfWeek: dayOfWeek,
      actions: this.actions.get(dayOfWeek)
    };
  }

  public days: Array<Array<DayOfWeek>> = [
    [
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY'
    ],
    [
      'THURSDAY',
      'FRIDAY',
      'SATURDAY'
    ],
    [
      'SUNDAY'
    ]
  ];
}
