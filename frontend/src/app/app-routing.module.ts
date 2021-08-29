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
import { CalenderComponent } from './calender/calender.component';
import { TrainerprofilesComponent } from './trainerprofiles/trainerprofiles.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cc', component: CalenderComponent },
  { path: 'p', component: TrainerprofilesComponent },

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
