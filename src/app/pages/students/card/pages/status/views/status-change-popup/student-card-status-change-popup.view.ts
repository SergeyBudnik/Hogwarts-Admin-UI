import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StudentStatus, StudentStatusType, Time, TimeUtils} from '../../../../../../../data';
import {SelectItem} from '../../../../../../../controls/select-item';
import {StudentStatusHttp} from '../../../../../../../http';
import {TranslationService} from '../../../../../../../service';

@Component({
  selector: 'app-card-student-status-change-popup',
  templateUrl: './student-card-status-change-popup.view.html',
  styleUrls: ['./student-card-status-change-popup.view.less']
})
export class StudentCardStatusChangePopupView {
  @Output() public statusSaved: EventEmitter<StudentStatus> = new EventEmitter<StudentStatus>();

  public modalVisible = true;

  public studentLogin: string;
  public previousStatus: StudentStatusType;
  public newStatus: StudentStatusType;
  public hasAction: boolean;

  public actionDateTime: number;
  public actionTime: Time = 'T_08_00';

  public loadingInProgress = true;
  public actionInProgress = false;

  public actionTimeItems = [];

  public constructor(
    private translationService: TranslationService,
    private studentStatusHttp: StudentStatusHttp
  ) {
    this.actionTimeItems = TimeUtils.values.map(it => new SelectItem(
      this.translationService.time().translate(it),
      it
    ));

    const date: Date = new Date();

    this.actionDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0, 0, 0, 0
    ).getTime();
  }

  @Input('studentId') public set setStudentLogin(studentLogin: string) {
    if (!!studentLogin) {
      this.studentLogin = studentLogin;
    }
  }

  @Input('previousStatus') public set setPreviousState(previousStatus: StudentStatusType) {
    if (!!previousStatus) {
      this.previousStatus = previousStatus;
    }
  }

  @Input('newStatus') public set setNewStatus(newStatus: StudentStatusType) {
    if (!!newStatus) {
      this.newStatus = newStatus;
    }
  }

  @Input('hasAction') public set setHasAction(hasAction: boolean) {
    this.hasAction = hasAction;
  }

  public close(): void {
    this.hideModal();
  }

  public changeStudentStatus() {
    this.actionInProgress = true;

    // let totalActionTimeValue = this.actionDateTime + TimeUtils.getTimeMills(this.actionTime);
    //
    // this.studentStatusHttp
    //   .changeStudentStatus(this.studentLogin, this.newStatus, totalActionTimeValue)
    //   .then(() => {
    //     this.actionInProgress = false;
    //     // ToDo: fix id
    //     this.statusSaved.emit(new StudentStatus(null, this.studentLogin, this.newStatus, new Date().getTime(), totalActionTimeValue));
    //     this.close();
    //   });
  }

  private hideModal(): void {
    this.modalVisible = !this.modalVisible;
  }
}
