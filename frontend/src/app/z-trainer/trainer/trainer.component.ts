import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { TrainerService } from '../../trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css'],
})
export class TrainerComponent implements OnInit {
  constructor(
    public _trainerService: TrainerService,
    private router: Router,
    public _auth: AuthService
  ) {}
  email = localStorage.getItem('email');
  ngOnInit(): void {
    this._trainerService.checkApprovalStatus(this.email).subscribe((data) => {
      sessionStorage.setItem('approved', 'true');
    });
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
