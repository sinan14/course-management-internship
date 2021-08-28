import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(public _adminService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  logoutUser() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
