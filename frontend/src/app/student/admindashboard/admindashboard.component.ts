import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {

  constructor(private router:Router) { }

 
stud(){
  this.router.navigate(['/students']);
}
users(){
  this.router.navigate(['/employees']);
}
app(){
  this.router.navigate(['/approve']);
}
}
