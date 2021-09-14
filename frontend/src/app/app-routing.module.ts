import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
const routes: Routes = [
  { path: '', component: PanelAdminComponent, pathMatch: 'full' },
  {
    path: 'admin',
    component: AdmSideNavComponent,
    children: [
      { path: '', component: PanelAdminComponent, pathMatch: 'full' },
      { path: 'dashboard', component: PanelAdminComponent },
      { path: 'students', component: NewdatatableComponent },
      { path: 'students/requests', component: AdminDataTableComponent },
    ],
  },
  { path: 'login', component: LoginStudentComponent },
  { path: 'register', component: StudentRegisterComponent },
  { path: 'employeeregister', component: EmployeeFormComponent },
  {
    path: 'employeelogin',

    component: LoginEmployeeComponent,
  },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'resetEmployeePassword', component: ResetEmpPasswordComponent },

  //need protection

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

  //error handling
  { path: 'error', component: ErrorsComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
