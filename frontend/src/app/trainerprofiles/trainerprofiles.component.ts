import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TrainerService } from '../trainer.service';
import { AuthService } from '../shared/auth.service';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-trainerprofiles',
  templateUrl: './trainerprofiles.component.html',
  styleUrls: ['./trainerprofiles.component.css'],
})
export class TrainerprofilesComponent implements OnInit {
  trainersdata: any;
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = true;

  alertMsg: any = '';

  search = {
    text: '',
  };

  trainer = {
    fname: '',
    lname: '',
    email: '',
    phno: '',
    address: '',
    qual: '',
    skill: '',
    comp: '',
    desgn: '',
    course: '',
    img: '',
    typeemp: '',
    id: '',
  };

  trainers = [
    {
      fname: '',
      lname: '',
      email: '',
      phno: '',
      address: '',
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
    public _trainerService: TrainerService,
    private router: Router,
    public _auth: AuthService
  ) {}

  ngOnInit(): void {
    let TrainerId = localStorage.getItem('deleteTrainerId');
    this._trainerService.getTrainers().subscribe((trainer) => {
      this.trainersdata = trainer;
      console.log(this.trainersdata);
    });
  }

  deleteTrainer(trainer: any) {
    this._trainerService.Remove(trainer.email).subscribe((data) => {
      this.trainers = this.trainers.filter((p) => p !== trainer);
    });
    // alert("Trainer deleted");
    window.location.reload();
  }

  editTrainer(trainer: any) {
    localStorage.setItem('editEmail', trainer.email);
    this.router.navigate(['/trainer/profile']);
  }

  allocateTrainer(trainer: any) {
    localStorage.setItem('allocateEmail', trainer.email);
    this.router.navigate(['/admin/allocation']);
  }

  Search(formValue: NgForm) {
    console.log(this.search);
    this._trainerService.searchTrainer(this.search.text).subscribe((trainer) => {
      this.trainersdata = trainer;
      console.log(this.trainersdata);
    });
  }
}
