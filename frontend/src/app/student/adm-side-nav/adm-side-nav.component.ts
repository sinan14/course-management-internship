import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adm-side-nav',
  templateUrl: './adm-side-nav.component.html',
  styleUrls: ['./adm-side-nav.component.css'],
})
export class AdmSideNavComponent implements OnInit {
  constructor(public _adminService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  logoutUser() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
