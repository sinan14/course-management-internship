import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css'],
})
export class NavHeaderComponent {

  title = 'ProductManagement';
  constructor(
    public _auth: AuthService,
    private _router: Router,
    private router: RouterModule
  ) {}
  viewStudentProfile(){
    this._auth.toStudentProfile();

  }
  viewEmployeeProfile(){
    this._auth.toEmployeeProfile();

  }
  logoutUser() {
    this._auth.logOut();
 
  }

  hero() {
    document.getElementById('hero').scrollIntoView();
  }

  about() {
    document.getElementById('about').scrollIntoView();
  }
  courses() {
    document.getElementById('courses').scrollIntoView();
  }
  gallery() {
    document.getElementById('gallery').scrollIntoView();
  }
  team() {
    document.getElementById('team').scrollIntoView();
  }
  contact() {
    document.getElementById('contact').scrollIntoView();
  }
}
