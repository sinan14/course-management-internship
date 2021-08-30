import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './z-trainer/header/header.component';
import { FooterComponent } from './z-trainer/footer/footer.component';
import { HomeComponent } from './z-trainer/home/home.component';
import { LoginComponent } from './z-trainer/login/login.component';
import { SignupComponent } from './z-trainer/signup/signup.component';
import { AboutusComponent } from './z-trainer/aboutus/aboutus.component';
import { TrainerComponent } from './z-trainer/trainer/trainer.component';
import { AdminComponent } from './z-trainer/admin/admin.component';
import { TokenInterceptorService } from './shared/token-interceptor.service';
import { SuccessComponent } from './z-trainer/success/success.component';
import { EnrollmentComponent } from './z-trainer/enrollment/enrollment.component';
import { RequestsComponent } from './z-trainer/requests/requests.component';
import { DashboardComponent } from './z-trainer/dashboard/dashboard.component';
import { TrainerapproveComponent } from './z-trainer/trainerapprove/trainerapprove.component';
import { SearchComponent } from './z-trainer/search/search.component';
import { TrainerallocationComponent } from './z-trainer/trainerallocation/trainerallocation.component';
import { TrainerProfileComponent } from './z-trainer/trainer-profile/trainer-profile.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AllocatedListComponent } from './z-trainer/allocated-list/allocated-list.component';
import { TrainerListComponent } from './z-trainer/trainer-list/trainer-list.component';
import { ScheduleComponent } from './z-trainer/schedule/schedule.component';
import { TrainerHomeComponent } from './z-trainer/trainer-home/trainer-home.component';
//student
import { AuthGuard } from './st-service/auth.guard';
import { StudentServiceService } from './st-service/student.service';
import { SafePipe } from './st-service/safe.pipe';
import { EmployeeService } from './st-service/employee.service';

// import { AdminDataTableComponent } from './student/admin-data-table/admin-data-table.component';
import { AllEmployeesComponent } from './student/All-empleyees/all-employees.component';
import { StudentRegisterComponent } from './student/student-register/student-register.component';
import { NavHeaderComponent } from './student/nav-header/nav-header.component';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { AllStudentsComponent } from './student/all-students/all-students.component';
import { StudentPaymentComponent } from './student/student-payment/student-payment.component';
import { ResetPasswordComponent } from './student/reset-password/reset-password.component';
import { ErrorsComponent } from './Errors/errors.component';
import { EmployeeFormComponent } from './student/employee-form/employee-form.component';
import { LoginEmployeeComponent } from './student/login-employee/login-employee.component';
import { ResetEmpPasswordComponent } from './student/reset-emp-password/reset-emp-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { NewdatatableComponent } from './student/newdatatable/newdatatable.component';
import { EmpProfileComponent } from './student/emp-profile/emp-profile.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AdmindashboardComponent } from './student/admindashboard/admindashboard.component';
import { EmpdashboardComponent } from './student/empdashboard/empdashboard.component';
import { CalenderComponent } from './calender/calender.component';
import { DatePipe } from '@angular/common';
import { TrainerprofilesComponent } from './trainerprofiles/trainerprofiles.component';
import { LoginStudentComponent } from './student/login-student/login-student.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    AboutusComponent,
    TrainerComponent,
    AdminComponent,
    SuccessComponent,
    EnrollmentComponent,
    RequestsComponent,
    DashboardComponent,
    TrainerapproveComponent,
    SearchComponent,
    TrainerallocationComponent,
    TrainerProfileComponent,
    AllocatedListComponent,
    TrainerListComponent,
    ScheduleComponent,
    TrainerHomeComponent,
    //student
    LoadingSpinnerComponent,
    StudentRegisterComponent,
    NavHeaderComponent,
    StudentProfileComponent,
    SafePipe,
    // NewdatatableComponent,
    EmpdashboardComponent,
    AllStudentsComponent,
    AllEmployeesComponent,
    StudentPaymentComponent,
    ResetPasswordComponent,
    EmployeeFormComponent,
    LoginEmployeeComponent,
    ResetEmpPasswordComponent,
    PageNotFoundComponent,
    EmpProfileComponent,
    AdmindashboardComponent,
    // AdminDataTableComponent,

    CalenderComponent,
    TrainerprofilesComponent,
    LoginStudentComponent,
  ],
  imports: [
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
