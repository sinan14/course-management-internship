import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/trainer.service';
import { TrainersSearchModel } from './trainerssearch.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  trainerslist: TrainersSearchModel[] = [];
  constructor(
    private _trainerService: TrainerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._trainerService.getTrainers().subscribe((trainers) => {
      this.trainerslist = JSON.parse(JSON.stringify(trainers));
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
      this.trainerslist = JSON.parse(JSON.stringify(trainers));
    });
  }
  updateSkill(event: any) {
    this.skillsearch = event.target.value;
  }
  searchSkill() {
    this._trainerService
      .searchBySkill(this.skillsearch)
      .subscribe((trainers) => {
        this.trainerslist = JSON.parse(JSON.stringify(trainers));
      });
  }
  updateType(event: any) {
    this.typesearch = event.target.value;
  }
  searchType() {
    this._trainerService.searchByType(this.typesearch).subscribe((trainers) => {
      this.trainerslist = JSON.parse(JSON.stringify(trainers));
    });
  }
  updateCourse(event: any) {
    this.coursesearch = event.target.value;
  }
  searchCourse() {
    this._trainerService
      .searchByCourse(this.coursesearch)
      .subscribe((trainers) => {
        this.trainerslist = JSON.parse(JSON.stringify(trainers));
      });
  }
  Allocate(trainer: any) {
    localStorage.setItem('gettrainerId', trainer._id.toString());

    this.router.navigate(['/admin/allocation']);
  }
}
