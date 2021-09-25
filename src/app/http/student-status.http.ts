import {Injectable} from '@angular/core';
import {HttpConfig} from './http-config';
import {HttpClient} from '@angular/common/http';
import {StudentStatus, StudentStatusType} from '../data';

@Injectable()
export class StudentStatusHttp {
  private root = `${HttpConfig.getBackendRoot()}/admin/students/statuses`;

  public constructor(
    readonly http: HttpClient
  ) {}

  public getLatestStatuses(): Promise<Array<StudentStatus>> {
    return this.http
      .get<Array<StudentStatus>>(`${this.root}/latest`)
      .toPromise();
  }

  public getAllStatuses(): Promise<Array<StudentStatus>> {
    return this.http
      .get<Array<StudentStatus>>(`${this.root}/latest`)
      .toPromise();
  }

  public changeStudentStatus(studentId: number, status: StudentStatusType, actionTime: number): Promise<any> {
    return this.http
      .put(`${this.root}/${studentId}/${status}`, actionTime)
      .toPromise()
      .then(() => {});
  }

  public getStatuses(studentLogin: string): Promise<Array<StudentStatus>> {
    return this.http
      .get<Array<StudentStatus>>(`${this.root}/student/${studentLogin}`)
      .toPromise()
  }
}
