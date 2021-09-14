import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TokenInterceptorService } from './shared/token-interceptor.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//student
import { AuthGuard } from './st-service/auth.guard';
import { StudentServiceService } from './st-service/student.service';
import { SafePipe } from './st-service/safe.pipe';
import { EmployeeService } from './st-service/employee.service';

import { AdminDataTableComponent } from './student/admin-data-table/admin-data-table.component';
import { StudentRegisterComponent } from './student/student-register/student-register.component';
import { NavHeaderComponent } from './student/nav-header/nav-header.component';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { AllStudentsComponent } from './student/all-students/all-students.component';
import { StudentPaymentComponent } from './student/student-payment/student-payment.component';
import { ResetPasswordComponent } from './student/reset-password/reset-password.component';
import { ErrorsComponent } from './shared/Errors/errors.component';
import { EmployeeFormComponent } from './student/employee-form/employee-form.component';
import { LoginEmployeeComponent } from './student/login-employee/login-employee.component';
import { ResetEmpPasswordComponent } from './student/reset-emp-password/reset-emp-password.component';
import { PageNotFoundComponent } from './student/page-not-found/page-not-found.component';
import { NewdatatableComponent } from './student/newdatatable/newdatatable.component';
import { EmpProfileComponent } from './student/emp-profile/emp-profile.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { DatePipe } from '@angular/common';
import { LoginStudentComponent } from './student/login-student/login-student.component';
import { PanelAdminComponent } from './student/panel-admin/panel-admin.component';
import { AdmSideNavComponent } from './student/adm-side-nav/adm-side-nav.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    //student
    LoadingSpinnerComponent,
    StudentRegisterComponent,
    NavHeaderComponent,
    StudentProfileComponent,
    SafePipe,
    NewdatatableComponent,
    AllStudentsComponent,
    StudentPaymentComponent,
    ResetPasswordComponent,
    EmployeeFormComponent,
    LoginEmployeeComponent,
    ResetEmpPasswordComponent,
    PageNotFoundComponent,
    EmpProfileComponent,
    AdminDataTableComponent,

    LoginStudentComponent,
    PanelAdminComponent,
    AdmSideNavComponent,
  ],
  imports: [
    MatSidenavModule,

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
