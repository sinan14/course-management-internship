import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TrainerService } from 'src/app/trainer.service';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.css'],
})
export class TrainerListComponent implements OnInit {
  trainers = [
    {
      // _id:'',
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
  imagePath: string;
  constructor(
    private trainerService: TrainerService,
    private router: Router,
  ) {
    this.imagePath = environment.imagePath;
  }

  ngOnInit(): void {
    this.trainerService.getTrainers().subscribe((data) => {
      this.trainers = JSON.parse(JSON.stringify(data));
    });
  }
  Allocate(trainer: any) {
    localStorage.setItem('allocateId', trainer._id.toString());
    localStorage.setItem('allocateEmail', trainer.email);
    this.router.navigate(['/admin/allocation']);
  }
  Remove(trainer: any) {
    var c = confirm('Are you sure you want to delete the trainer??');
    if (c) {
      this.trainerService.Remove(trainer.email).subscribe((data) => {
        this.trainers = this.trainers.filter((p) => p !== trainer);
      });
    }
  }
}
