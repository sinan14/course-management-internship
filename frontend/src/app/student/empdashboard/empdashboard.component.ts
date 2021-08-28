import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empdashboard',
  templateUrl: './empdashboard.component.html',
  styleUrls: ['./empdashboard.component.css']
})
export class EmpdashboardComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  stud(){
    this.router.navigate(['students']);
  }

}
