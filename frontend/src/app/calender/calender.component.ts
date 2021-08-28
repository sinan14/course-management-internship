import { Component, OnInit } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { CalendarEvent } from 'calendar-utils';
import { TrainerService } from '../trainer.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { startOfDay, endOfDay } from 'date-fns';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],
})
export class CalenderComponent implements OnInit {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  startdate: any;
  enddate: any;
  events: CalendarEvent[] = [];
  trainer: any;
  trainers: any;
  constructor(
    private _trainerService: TrainerService,
    private router: Router,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    let cuser = localStorage.getItem('email');
  //   this._trainerService.showSchedule(cuser).subscribe((data) => {
  //       this.trainers = JSON.parse(JSON.stringify(data));
  //       for (let tr of this.trainers) {
  //         this.startdate = this.datepipe.transform(
  //           tr.startdate,
  //           'yyyy-MM-dd',
  //           '+0530'
  //         );
  //         this.enddate = this.datepipe.transform(
  //           tr.enddate,
  //           'yyyy/MM/dd',
  //           '+0530'
  //         );
  //         this.events = [
  //           ...this.events,
  //           {
  //             start: new Date(this.startdate),
  //             end: new Date(this.enddate),
  //             title: tr.fname,
  //           },
  //         ];
  //       }
  //     }
  // }
  }

  //----------------------------------------------------------------------------/
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    let cuser = localStorage.getItem('currentUser');
    if (cuser != 'tmsadmn@gmail.com') {
      // Swal.fire({
      //   icon: 'info',
      //   title: this.trainer.coursename,
      //   html: `<p> Time:${this.trainer.time} <br>
      // Batchid:${this.trainer.batchid}<br>
      // Venue:${this.trainer.meetingvenue}</p>`,
      // });
    }
  }
}
