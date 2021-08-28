import { Component, OnInit } from '@angular/core';
import { TrainerService } from '../../trainer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainerapprove',
  templateUrl: './trainerapprove.component.html',
  styleUrls: ['./trainerapprove.component.css'],
})
export class TrainerapproveComponent implements OnInit {
  request = {
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
  };
  constructor(
    private _trainerService: TrainerService,
    private router: Router
  ) {}
  ngOnInit(): void {
    let approveEmail = localStorage.getItem('approveEmail');
    this._trainerService
      .getApprovalRequest(approveEmail)
      .subscribe((data: any) => {
        this.request = JSON.parse(JSON.stringify(data));
        console.log(this.request);
      });
  }
  onApprove() {
    console.log(this.request);
    this._trainerService.Approve(this.request).subscribe((data) => {
      console.log(data);
      alert('Trainer Approved');
      this.router.navigate(['/admin/requests']);
    });
  }
}
