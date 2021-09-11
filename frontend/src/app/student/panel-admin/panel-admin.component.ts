import { Component, OnInit } from '@angular/core';
// import { TrainersSearchModel } from './trainerssearch.module';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { TrainerService } from '../../trainer.service';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css'],
})
export class PanelAdminComponent implements OnInit {
  // trainersList: TrainersSearchModel[] = [];
  trainersList: any;
  constructor(
    private _trainerService: TrainerService,
    private router: Router,
    private _auth: AuthService
  ) {}
  numbers = [];
  ngOnInit(): void {
    // if (!this._auth.checkAdmin()) {
    //   this.router.navigate(['/login']);
    // }
    this._trainerService.getTrainers().subscribe((trainers) => {
      this.trainersList = JSON.parse(JSON.stringify(trainers));
      console.log(this.trainersList);
    });

    this._trainerService.getNumbers().subscribe((data) => {
      this.numbers = JSON.parse(JSON.stringify(data));
    });
  }
  namesearch = '';
  skillsearch = '';
  typesearch = '';
  coursesearch = '';
  updateName(event: any) {
    this.namesearch = event.target.value;
  }
  searchName() {
    this._trainerService.searchByName(this.namesearch).subscribe((trainers) => {
      this.trainersList = JSON.parse(JSON.stringify(trainers));
    });
  }
  updateSkill(event: any) {
    this.skillsearch = event.target.value;
  }
  searchSkill() {
    this._trainerService
      .searchBySkill(this.skillsearch)
      .subscribe((trainers) => {
        this.trainersList = JSON.parse(JSON.stringify(trainers));
      });
  }
  updateType(event: any) {
    this.typesearch = event.target.value;
  }
  searchType() {
    this._trainerService.searchByType(this.typesearch).subscribe((trainers) => {
      this.trainersList = JSON.parse(JSON.stringify(trainers));
    });
  }
  updateCourse(event: any) {
    this.coursesearch = event.target.value;
  }
  searchCourse() {
    this._trainerService
      .searchByCourse(this.coursesearch)
      .subscribe((trainers) => {
        this.trainersList = JSON.parse(JSON.stringify(trainers));
      });
  }
  Allocate(trainer: any) {
    localStorage.setItem('allocateId', trainer._id.toString());
    localStorage.setItem('alloateEmail', trainer.email);
    this.router.navigate(['/admin/allocation']);
  }
}
