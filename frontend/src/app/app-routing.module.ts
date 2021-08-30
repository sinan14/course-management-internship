import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './z-trainer/home/home.component';
import { LoginComponent } from './z-trainer/login/login.component';
import { SignupComponent } from './z-trainer/signup/signup.component';
import { AboutusComponent } from './z-trainer/aboutus/aboutus.component';
import { TrainerComponent } from './z-trainer/trainer/trainer.component';
import { AdminComponent } from './z-trainer/admin/admin.component';
import { SuccessComponent } from './z-trainer/success/success.component';
import { EnrollmentComponent } from './z-trainer/enrollment/enrollment.component';
import { RequestsComponent } from './z-trainer/requests/requests.component';
import { DashboardComponent } from './z-trainer/dashboard/dashboard.component';
import { TrainerapproveComponent } from './z-trainer/trainerapprove/trainerapprove.component';
import { SearchComponent } from './z-trainer/search/search.component';
import { TrainerallocationComponent } from './z-trainer/trainerallocation/trainerallocation.component';
import { TrainerProfileComponent } from './z-trainer/trainer-profile/trainer-profile.component';
import { AllocatedListComponent } from './z-trainer/allocated-list/allocated-list.component';
import { TrainerListComponent } from './z-trainer/trainer-list/trainer-list.component';
import { ScheduleComponent } from './z-trainer/schedule/schedule.component';
import { TrainerHomeComponent } from './z-trainer/trainer-home/trainer-home.component';
import { TrainerprofilesComponent } from './trainerprofiles/trainerprofiles.component';
//student
import { AuthGuard } from './st-service/auth.guard';
import { StudentServiceService } from './st-service/student.service';
import { SafePipe } from './st-service/safe.pipe';
import { EmployeeService } from './st-service/employee.service';

import { AdminDataTableComponent } from './student/admin-data-table/admin-data-table.component';
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
import { NewdatatableComponent } from './student/newdatatable/newdatatable.component';
import { EmpProfileComponent } from './student/emp-profile/emp-profile.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AdmindashboardComponent } from './student/admindashboard/admindashboard.component';
import { EmpdashboardComponent } from './student/empdashboard/empdashboard.component';
import { DatePipe } from '@angular/common';
import { LoginStudentComponent } from './student/login-student/login-student.component';
const routes: Routes = [
  // { path: '', component: LoginComponent },
  { path: 'p', component: TrainerprofilesComponent },
  { path: 'l', component: LoginStudentComponent },
  { path: 'e', component: EmployeeFormComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: StudentRegisterComponent },
  { path: 'employeeregister', component: EmployeeFormComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'employeelogin',

    component: LoginEmployeeComponent,
  },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'resetEmployeePassword', component: ResetEmpPasswordComponent },

  //need protection

  {
    path: 'admin-panel',

    component: AdmindashboardComponent,
  },
  {path: 'employee-panel',component: EmpdashboardComponent,},
  {path: 'approve',component: AdminDataTableComponent,},
  {path: 'employees',component: AllEmployeesComponent,},
  {
    path: 'employees/:_id',

    component: EmpProfileComponent,
  },
  {
    path: 'students',

    component: NewdatatableComponent,
  },

  {
    path: 's',

    component: AllStudentsComponent,
  },
  {
    path: 'students/:_id',

    component: StudentProfileComponent,
    pathMatch: 'full',
  },
  { path: 'students/:_id/pay', component: StudentPaymentComponent },


  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'aboutus', component: AboutusComponent },
  {
    path: 'trainer',
    component: TrainerComponent,
    children: [
      { path: '', component: TrainerHomeComponent },
      { path: 'profile', component: TrainerProfileComponent },
      { path: 'enrollment', component: EnrollmentComponent },
      { path: 'success', component: SuccessComponent },
      { path: 'schedule', component: ScheduleComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'requests', component: RequestsComponent },
      { path: 'approval', component: TrainerapproveComponent },
      { path: '', component: DashboardComponent },
      { path: 'search', component: SearchComponent },
      { path: 'allocation', component: TrainerallocationComponent },
      { path: 'allocatedlist', component: AllocatedListComponent },
      // {path:'allocatedlist',component:TrainerprofilesComponent},
      // { path: 'trainerlist', component: TrainerListComponent },
      { path: 'trainerlist', component: TrainerprofilesComponent },

      {
        path: 'home',
        component: DashboardComponent,
      },
    ],
  },
  //error handling
  { path: 'error', component: ErrorsComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
