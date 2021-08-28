import { Component, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarView,
} from 'angular-calendar';
import { startOfDay } from 'date-fns';
import { AuthService } from '../../shared/auth.service';
import { TrainerService } from '../../trainer.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  constructor(private _trainerService: TrainerService) {}
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  setView(view: CalendarView) {
    this.view = view;
  }
  events: CalendarEvent[] = [];
  schedules: any = [];
  items: CalendarEvent[] = [];

  ngOnInit(): void {
    var email = localStorage.getItem('email');
    this._trainerService.showSchedule(email).subscribe((data) => {
      this.schedules = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < this.schedules.length; i++) {
        // this.events.push({
        //   start:startOfDay(new Date(this.schedules[i].startdate)),
        //   end:new Date(this.schedules[i].enddate),
        //   title: 'course id:' +this.schedules[i].courseid,
        // })
        this.items.push({
          start: startOfDay(new Date(this.schedules[i].startdate)),
          end: new Date(this.schedules[i].enddate),
          title: 'course id:' + this.schedules[i].courseid,
        });

        this.events = this.items;
      }
    });
    // console.log(this.schedules);
    // console.log(this.events);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    // alert(JSON.stringify(events));
    console.log(events);
    console.log(date);
  }
}
