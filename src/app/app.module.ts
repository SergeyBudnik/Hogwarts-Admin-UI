import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {TagInputModule} from 'ngx-chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ColorPickerModule} from 'ngx-color-picker';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AuthInterceptor} from './interceptors/auth.interceptor';

import {AppComponent} from './app.component';
import {HeaderComponent} from './parts/header/header.component';
import {MenuComponent} from './parts/menu/menu.component';
import {TimetableComponent} from './parts/timetable/timetable.component';

import {CookieOptions, CookieService} from 'angular2-cookie/core';

import * as Pages from './pages';
import * as Services from './service';
import * as Https from './http';

import 'rxjs/Rx';
import {FieldValidationSignComponent} from './parts/field-validation-sign/field-validation-sign.component';
import {MyDatePickerModule} from 'mydatepicker';

import * as Controls from './controls';
import {StudentPaymentModal} from './parts/student/payment-modal/student-payment.modal';
import {ModalTemplateComponent} from './templates/modal/modal.template';
import {StudentPaymentRowComponent} from './pages/student/payment/payment-row/student-payment.row';

const appRoutes: Routes = [
  { path: 'login', component: Pages.LoginPageComponent },

  { path: 'teachers', component: Pages.TeachersListPageComponent },
  { path: 'teachers/:id/information', component: Pages.TeacherInformationPageComponent },
  { path: 'teachers/:id/timetable', component: Pages.TeacherTimetablePageComponent },

  { path: 'students', component: Pages.StudentsListPageComponent },
  { path: 'students/:id/information', component: Pages.StudentInformationPageComponent },
  { path: 'students/:id/attendance', component: Pages.StudentAttendancePageComponent },
  { path: 'students/:id/payment', component: Pages.StudentPaymentPageComponent },

  { path: 'cabinets', component: Pages.CabinetsListPageComponent },
  { path: 'cabinets/:id/information', component: Pages.CabinetInformationPageComponent },
  { path: 'cabinets/:id/timetable', component: Pages.CabinetTimetablePageComponent },

  { path: 'groups', component: Pages.GroupsListPageComponent },
  { path: 'groups/:id/information', component: Pages.GroupInformationPageComponent },
  { path: 'groups/:id/students', component: Pages.GroupStudentsPageComponent },
  { path: 'groups/:id/timetable', component: Pages.GroupTimetablePageComponent },

  { path: '**', component: Pages.TeachersListPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    MenuComponent,
    TimetableComponent,
    FieldValidationSignComponent,

    Pages.LoginPageComponent,

    Pages.TeacherInformationPageComponent,
    Pages.TeacherTimetablePageComponent,
    Pages.TeacherMenuPageComponent,
    Pages.TeachersListPageComponent,

    Pages.StudentInformationPageComponent,
    Pages.StudentAttendancePageComponent,
    Pages.StudentAddAttendancePopup,
    Pages.StudentPaymentPageComponent,
    Pages.StudentMenuPageComponent,
    Pages.StudentsListPageComponent,

    Pages.CabinetInformationPageComponent,
    Pages.CabinetTimetablePageComponent,
    Pages.CabinetMenuPageComponent,
    Pages.CabinetsListPageComponent,

    Pages.GroupInformationPageComponent,
    Pages.GroupStudentsPageComponent,
    Pages.GroupTimetablePageComponent,
    Pages.GroupMenuPageComponent,
    Pages.AssignLessonPopupComponent,

    Pages.GroupsListPageComponent,

    StudentPaymentRowComponent,

    StudentPaymentModal,

    ModalTemplateComponent,

    Controls.SearchSelectControl,
    Controls.SearchTextInputControl,
    Controls.FormSelectControl,
    Controls.FormTagControl,
    Controls.FormTextControl
  ],
  imports: [
    TagInputModule,
    ColorPickerModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    ToastModule.forRoot(),
    RouterModule.forRoot(appRoutes, {useHash: true}),
    MyDatePickerModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },

    CookieService,

    {
      provide: CookieOptions,
      useValue: {}
    },

    Services.LoginService,
    Services.GroupsService,
    Services.StudentsService,
    Services.TeachersService,
    Services.CabinetsService,
    Services.LessonsService,
    Services.StudentActionsService,
    Services.StudentPaymentService,

    Https.LoginHttp,
    Https.CabinetsHttp,
    Https.GroupsHttp,
    Https.StudentsHttp,
    Https.TeachersHttp,
    Https.StudentActionsHttp,
    Https.StudentPaymentHttp
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
