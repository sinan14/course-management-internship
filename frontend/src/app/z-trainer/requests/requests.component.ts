import { Component, OnInit } from '@angular/core';
// import { request } from 'http';
import { TrainerService } from '../../trainer.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
})
export class RequestsComponent implements OnInit {
  requests = [
    {
      fname: '',
      lname: '',
      address: '',
      email: '',
      phno: '',
      qual: '',
      skill: '',
      comp: '',
      desgn: '',
      course: '',
      img: '',
      typeemp: '',
    },
  ];
  constructor(
    private _trainerService: TrainerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._trainerService.getRequestList().subscribe((data) => {
      this.requests = JSON.parse(JSON.stringify(data));
      console.log(this.requests);
    });
  }
  Reject(request: any) {
    var c = confirm('Are you sure you want to reject this request?');
    if (c) {
      this._trainerService.Reject(request.email).subscribe((data) => {
        this.requests = this.requests.filter((p) => p !== request);
      });
    }
  }
  Approve(request: any) {
    localStorage.setItem('approveEmail', request.email);
    this.router.navigate(['/admin/approval']);
    // alert("Trainer is approved")
  }
}
