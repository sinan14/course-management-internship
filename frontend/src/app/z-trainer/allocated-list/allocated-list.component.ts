import { Component, OnInit } from '@angular/core';
import { TrainerService } from '../../trainer.service';

@Component({
  selector: 'app-allocated-list',
  templateUrl: './allocated-list.component.html',
  styleUrls: ['./allocated-list.component.css'],
})
export class AllocatedListComponent implements OnInit {
  trainers = [
    {
      fname: '',
      lname: '',
      email: '',
      course: '',
      startdate: '',
      enddate: '',
      time: '',
      courseid: '',
      batchid: '',
      meetinglink: '',
    },
  ];
  constructor(private _trainerService: TrainerService) {}

  ngOnInit(): void {
    this._trainerService.getAllocatedlist().subscribe((data) => {
      this.trainers = JSON.parse(JSON.stringify(data));
      console.log(this.trainers);
    });
  }
}
