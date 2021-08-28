import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerService } from '../../trainer.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  userItem = {
    traineremail: '',
    trainerusername: '',
    trainerpass: '',
  };
  constructor(private TrainerService: TrainerService, private router: Router) {}

  AddTrainer() {
    this.TrainerService.newTrainer(this.userItem).subscribe((data) => {
      console.log(data);
      alert('Successfully Registered');
      this.router.navigate(['/login']);
    });
  }
}
