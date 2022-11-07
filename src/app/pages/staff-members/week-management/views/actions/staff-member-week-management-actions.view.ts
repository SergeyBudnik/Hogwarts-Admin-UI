import {Component, Input} from '@angular/core';
import {StaffMemberWeekManagementActionsDayData} from '../actions-day/staff-member-week-management-actions-day.data';
import {StaffMemberWeekManagementActionsViewData} from './staff-member-week-management-actions.view.data';
import {DayOfWeek, StaffMemberAction} from '../../../../../data';

@Component({
  selector: 'app-staff-member-week-management-actions-view',
  templateUrl: './staff-member-week-management-actions.view.html',
  styleUrls: ['./staff-member-week-management-actions.view.less']
})
export class StaffMemberWeekManagementActionsViewComponent {
  private actions: Map<DayOfWeek, Array<StaffMemberAction>> = new Map();

  @Input('data') public set setData(data: StaffMemberWeekManagementActionsViewData) {
    this.actions = data.actions;
  }

  public getDayData(dayOfWeek: DayOfWeek): StaffMemberWeekManagementActionsDayData {
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
