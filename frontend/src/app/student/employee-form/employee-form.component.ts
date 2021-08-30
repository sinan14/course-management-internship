import { AuthService } from '../../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  isLoading: boolean = false;
  image;
  courses = [
    'Full Stack Development',
    'Data Science and Analytics',
    'Robotic Process Automation',
  ];
  ngOnInit() {
    this.employeeForm.patchValue({
      Password: 'Ict@2021',
      SkillSet: 'Java,Js,C++',
    });
  }

  phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  emailReg = /[a-z0-9._%+-]+@[a-z0-9.-]+\.([a-z]{3})+(\.([a-z]{2,}))?$/;

  constructor(private _auth: AuthService, private _fb: FormBuilder) {}
  employeeForm = this._fb.group({
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    comp: ['', Validators.required],
    desgn: ['', Validators.required],
    course: ['', Validators.required],
    img: [''],
    qual: ['', Validators.required],
    skill: ['', [Validators.required]],
    address: [''],
    email: ['', [Validators.required, Validators.pattern(this.emailReg)]],
    phno: ['', [Validators.required, Validators.pattern(this.phoneReg)]],
    //************************** */

    Gender: ['Male', [Validators.required]],
    DOB: ['', Validators.required],
    State: ['', Validators.required],
    District: ['', Validators.required],
    Post: ['', Validators.required],
    PinCode: [
      '',
      [Validators.required, Validators.min(100000), Validators.max(999999)],
    ],
    Password: ['Ict@2021'],
    // PassOfYear: [
    //   '',
    //   [Validators.required, Validators.min(2000), Validators.max(2020)],
    // ],
  });

  registerEmployee() {
    if (this.employeeForm.invalid) {
      this.isLoading = false;
      console.log(this.employeeForm.value);

      // return;
    }
    this.isLoading = true;
    console.log(this.employeeForm.value);

    // this._auth.registerEmployee(this.employeeForm.value).subscribe(
    //   (response) => {
    //     this.isLoading = false;
    //     if (response) {
    //       Swal.fire({
    //         title: 'Good Job💖💖💖',

    //         text: 'successfully registered your password is \n  Ict@2021 ',
    //         icon: 'success',
    //       }).then(() => {
    //         this.isLoading = false;
    //       });
    //     } else {
    //       Swal.fire({
    //         title: 'Oops...🤷‍♂️🤷‍♂️',
    //         timer: 1500,
    //         text: 'Something went wrong!',
    //         icon: 'error',
    //       }).then(() => {
    //         window.location.reload();
    //       });
    //     }
    //   },
    //   (errorMessage) => {
    //     this.isLoading = false;
    //     Swal.fire({
    //       title: 'warning🤦‍♂️🤦‍♂️🤦‍♂️!!',
    //       showConfirmButton: false,
    //       timer: 1000,
    //       text: 'some internal error',
    //       icon: 'error',
    //     }).then(() => {
    //       this.ngOnInit();
    //     });
    //   }
    // );
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
      this.employeeForm.get('img')!.setValue(this.image);
    }
  }

  //******************************************************************** */
  states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Orissa',
    'Puducherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];
}
