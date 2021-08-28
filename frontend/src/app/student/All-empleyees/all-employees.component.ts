import { EmployeeService } from '../../st-service/employee.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css'],
})
export class AllEmployeesComponent implements OnInit {
  isLoading: boolean = false;
  Employees = [
    {
      _id: '',
      Name: '',
      Email: '',
      Phone: '',
      Gender: '',
      DOB: '',
      HighestQualification: '',
      PassOutYear: '',
      SkillSet: '',
      State: '',
      District: '',
      Post: '',
      PinCode: '',
      CreationDate: '',
    },
  ];

  constructor(private _http: HttpClient,private _empservice:EmployeeService, private _router: Router) {}


  ngOnInit() {
    this.isLoading = true;
    this._empservice.fetchEmployees().subscribe(
      (data) => {
        this.isLoading = false;
        this.Employees = JSON.parse(JSON.stringify(data));
      },
      (error) => {
        this.isLoading = false;
        Swal.fire({
          title: '🤦‍♂️🤦‍♂️🤦‍♂️',
          text: 'server error',
          icon: 'error',
          timer: 500,
          showConfirmButton: false,
        }).then(() => {
          this._router.navigate(['/']);
        });
      }
    );
  }
}
