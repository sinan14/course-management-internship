import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AdminDataTableComponent } from "./student/admin-data-table/admin-data-table.component";
import { StudentRegisterComponent } from "./student/register-stud/student-register.component";
import { StudentProfileComponent } from "./student/profile-student/student-profile.component";
import { AllStudentsComponent } from "./student/all-students/all-students.component";
import { ErrorsComponent } from "./shared/Errors/errors.component";
import { EmployeeFormComponent } from "./student/Form_Professor/employee-form.component";
import { LoginEmployeeComponent } from "./student/Login-professor/login-employee.component";
import { PageNotFoundComponent } from "./student/page-not-found/page-not-found.component";
import { NewdatatableComponent } from "./student/stud-datatable/newdatatable.component";
import { EmpProfileComponent } from "./student/Profile_professor/emp-profile.component";
import { LoginStudentComponent } from "./student/login-student/login-student.component";
import { PanelAdminComponent } from "./student/panel-admin/panel-admin.component";
import { AdmSideNavComponent } from "./student/sideNavAdmin/adm-side-nav.component";
import { HomeComponent } from "./home/home.component";
import { AddCourseComponentComponent } from "./add-course-component/add-course-component.component";
import { CoursesComponent } from "./courses/courses.component";
import { CouseEditComponent } from "./couse-edit/couse-edit.component";
import { AllProfessorComponent } from "./all-professor/all-professor.component";

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "student/login", component: LoginStudentComponent },
  { path: "student/Enroll", component: StudentRegisterComponent },
  { path: "professor/Enroll", component: EmployeeFormComponent },
  {
    path: "professor/login",
    component: LoginEmployeeComponent,
  },

  {
    path: "admin",
    component: AdmSideNavComponent,
    children: [
      { path: "", component: PanelAdminComponent, pathMatch: "full" },
      { path: "dashboard", component: PanelAdminComponent },
      { path: "courses", component: CoursesComponent },
      { path: "courses/new", component: AddCourseComponentComponent },
      { path: "courses/:id/edit", component: CouseEditComponent },
      { path: "students", component: NewdatatableComponent },
      { path: "students/requests", component: AdminDataTableComponent },
    ],
  },
  {
    path: "s",
    component: AllStudentsComponent,
  },
  { path: "students/:_id", component: StudentProfileComponent },
  { path: "professors", component: AllProfessorComponent },

  { path: "p", component: AllProfessorComponent },

  {
    path: "professors/:_id",
    component: EmpProfileComponent,
  },

  //error handling
  { path: "error", component: ErrorsComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
