import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public _auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    
  }
  logoutUser() {
    localStorage.removeItem("token");
    localStorage.clear();
    this.router.navigate(["/professor/login"]);
  }

}
