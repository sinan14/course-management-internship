import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerService } from '../../trainer.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css'],
})
export class EnrollmentComponent implements OnInit {
  constructor(private trainerservice: TrainerService, private router: Router) {}

  ngOnInit(): void {}
  courses = [
    'CERTIFIED XR ASSOCIATE',
    'CERTIFIED CYBER SECURITY ANALYST',
    'CERTIFIED SPECIALIST IN FULL STACK DEVELOPMENT',
    'CERTIFIED SPECIALIST INs DATA SCIENCE & ANALYTICS',
    'MICRO SKILLS TRAINING ON ROBOTIC PROCESS AUTOMATION',
    'MICRO SKILLS TRAINING ON DIGITAL MARKETING AND SEO',
    'CERTIFIED SPECIALIST IN MACHINE LEARNING AND ARTIFICIAL INTELLIGENCE',
    'MOODLE',
    'ARM EMBEDDED SYSTEMS',
    'IOT FOR ENGINEERING APPLICATIONS',
    'AWS EDUCATE',
  ];
  fname = '';
  lname = '';
  address = '';
  email: any = localStorage.getItem('email');
  phno = '';
  qual = '';
  skill = '';
  comp = '';
  desgn = '';
  course = '';
  img: any;
  url: any = './assets/trainer.jpg';

  onFileSelected(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.url = e.target.result;
      };
      this.img = event.target.files[0];
    }
  }

  addRequest() {
    var formdata = new FormData();
    formdata.append('img', this.img);
    formdata.append('fname', this.fname);
    formdata.append('lname', this.lname);
    formdata.append('address', this.address);
    formdata.append('email', this.email);
    formdata.append('phno', this.phno);
    formdata.append('qual', this.qual);
    formdata.append('skill', this.skill);
    formdata.append('comp', this.comp);
    formdata.append('desgn', this.desgn);
    formdata.append('course', this.course);

    this.trainerservice.newEnrollment(formdata).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/trainer/success']);
    });
  }
}
