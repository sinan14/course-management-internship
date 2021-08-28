import { AuthService } from '../../shared/auth.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../st-service/employee.service';

@Component({
  selector: 'app-emp-profile',
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.css'],
})
export class EmpProfileComponent implements OnInit {
  // backendUrl = 'http://localhost:3000';
  // backendUrl = '/api';

  id: string;
  isLoading: boolean = false;
  phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  passwordReg =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
  emailReg = /[a-z0-9._%+-]+@[a-z0-9.-]+\.([a-z]{3})+(\.([a-z]{2,}))?$/;

  showEditButton: boolean;
  owner: boolean = false;
  showDeleteButton: boolean;
  readonly: boolean;

  isOwner() {
    if (this._auth.getId() == this.employee._id) {
      this.owner = true;
    } else {
      this.owner = false;
    }
  }
  update(): void {
    this.readonly = !this.readonly;
  }
  discard(): void {
    this.readonly = !this.readonly;
    this.ngOnInit();
  }
  isAllowedToEdit(): void {
    if (
      this._auth.loggedIn() &&
      (this._auth.getUser() == 'admin' || this._auth.getUser() == 'employee')
    ) {
      // console.log('true');
      this.showEditButton = true;
    } else {
      this.showDeleteButton = false;
    }
  }

  isAdmin(): void {
    if (this._auth.loggedIn() && this._auth.getUser() == 'admin') {
      this.showDeleteButton = true;
    } else {
      this.showDeleteButton = false;
    }
  }

  employeeUpdateForm: FormGroup;
  employee = {
    _id: '',
    Name: '',
    Email: '',
    Phone: '',
    Gender: '',
    DOB: '',
    HighestQualification: '',
    SkillSet: '',
    State: '',
    District: '',
    Post: '',
    PinCode: '',
    PassOfYear: '',
    Password: '',
  };

  constructor(
    private _http: HttpClient,
    private _ActivatedRoute: ActivatedRoute,
    private _router: Router,
    private _employeeService: EmployeeService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this.isAllowedToEdit();
    this.isOwner();
    this.isAdmin();
    this.readonly = true;
    this.id = this._ActivatedRoute.snapshot.params['_id'];
    this.isLoading = true;
    this._employeeService.fetchEmployee(this.id).subscribe(
      (employeesData: any) => {
        this.isLoading = false;
        // console.log(employeesData);
        if (employeesData.error) {
          this.isLoading = false;
          this._router.navigate(['/error'], { state: employeesData });
        }
        //************************************************************* */
        this.employee = JSON.parse(JSON.stringify(employeesData));
        this.employeeUpdateForm = new FormGroup({
          Sex: new FormControl(this.employee.Gender, [Validators.required]),
          Name: new FormControl(this.employee.Name, [Validators.required]),
          Email: new FormControl(this.employee.Email, [
            Validators.required,
            Validators.pattern(this.emailReg),
          ]),
          Phone: new FormControl(this.employee.Phone, [
            Validators.required,
            Validators.pattern(this.phoneReg),
          ]),
          State: new FormControl(this.employee.State, [Validators.required]),
          HighestQualification: new FormControl(
            this.employee.HighestQualification,
            [Validators.required]
          ),
          PassOfYear: new FormControl(this.employee.PassOfYear, [
            Validators.required,
            Validators.min(2000),
            Validators.max(2021),
          ]),
          SkillSet: new FormControl(this.employee.SkillSet, [
            Validators.required,
          ]),

          DOB: new FormControl(this.employee.DOB, [Validators.required]),
          Password: new FormControl(this.employee.Password, [
            Validators.required,
            Validators.pattern(this.passwordReg),
          ]),
        });
      },
      (errorMessage) => {
        this.isLoading = false;
        this._router.navigate([`/employee`]);
        Swal.fire('🤦‍♂️🤦‍♂️🤦‍♂️danger!!', 'some internal error', 'error').then(
          (refresh) => {
            this._router.navigate([`/`]);
          }
        );
      }
    );
  } //*************************************** */

  // editProfile(changedDetails) {
  //   return this._http.put(
  //     `${this.backendUrl}/employee/${this.employee._id}`,

  //     changedDetails
  //   );
  // }
  //******************************** */

  updateProfile() {
    this.isLoading = true;
    if (this.employeeUpdateForm.invalid) {
      Swal.fire({
        title: 'inalid',
        text: 'form is invalid',
        icon: 'warning',

        timer: 1000,
        showConfirmButton: false,
      });
      this.isLoading = false;
      return;
    }
    this._employeeService
      .editEmployee(this.employeeUpdateForm.value, this.employee._id)
      .subscribe(
        (employeesData: any) => {
          this.isLoading = false;
          if (employeesData.error) {
            Swal.fire({
              title: 'warning!!',
              text: 'something went wrong',
              icon: 'error',
              timer: 500,
              showConfirmButton: false,
            }).then((refresh) => {
              this.readonly = !this.readonly;
              this._router.navigate(['/error'], { state: employeesData });
            });
          }
          Swal.fire({
            title: 'Good Job 😉😉!!',
            text: 'profile updated successfully',
            icon: 'success',
            timer: 500,
            showConfirmButton: false,
          }).then((refresh) => {
            this.readonly = !this.readonly;
            this.ngOnInit();
          });
        },
        (errorMessage) => {
          this.isLoading = false;
          Swal.fire({
            title: 'danger!!🤦‍♂️🤦‍♂️🤦‍♂️',
            text: 'some internal error',
            icon: 'error',
            timer: 1000,
            showConfirmButton: false,
          }).then((refresh) => {
            this.readonly = !this.readonly;
          });
        }
      );
  }

  //***************************************don't touch */

  deleteProfile() {
    this.isLoading = true;
    return this._employeeService.deleteEmployee(this.employee._id).subscribe(
      (employeesData) => {
        this.isLoading = false;
        this._router.navigate([`/employees`]);
      },
      (errorMessage) => {
        this.isLoading = false;
        Swal.fire('danger!!', 'some internal error', 'error').then(
          (refresh) => {
            this._router.navigate(['/']);
          }
        );
      }
    );
  }
}
