import { Component } from '@angular/core';
// import { TrainersSearchModel } from './trainerssearch.module';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css'],
})
export class PanelAdminComponent {
  // trainersList: TrainersSearchModel[] = [];
  trainersList: any;
  constructor(
    private router: Router,
    private _auth: AuthService
  ) {}
  numbers = [];

}
