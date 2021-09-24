import { AuthService } from '../../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css'],
})
export class StudentRegisterComponent implements OnInit {
  image: string;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _auth: AuthService
  ) {}
  isLoading: boolean = false;
  emailReg = /[a-z0-9._%+-]+@[a-z0-9.-]+\.([a-z]{3})+(\.([a-z]{2,}))?$/;

  phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  registerForm = this._fb.group({
    Name: ['', Validators.required],
    Email: ['', [Validators.required, Validators.pattern(this.emailReg)]],
    Phone: ['', [Validators.required, Validators.pattern(this.phoneReg)]],
    Sex: ['Male', Validators.required],
    DOB: ['', Validators.required],
    Course: ['', Validators.required],
    HighestQualification: ['', Validators.required],
    PassOfYear: [
      '',
      [Validators.required, Validators.min(2010), Validators.max(2022)],
    ],
    State: ['', Validators.required],
    District: ['', [Validators.required, Validators.minLength(3)]],
    Post: ['', [Validators.required, Validators.minLength(3)]],
    PinCode: [
      '',
      [
        Validators.required,
        Validators.min(100000),
        Validators.maxLength(999999),
      ],
    ],
    Status: ['inactive'],

    CreationDate: new Date(),
    PaymentDate: [''],
    ApprovalDate: [''],
    img: ['', [Validators.required]],
  });

  async registerStudent() {
    if (this.registerForm.invalid) {
      return;
    }
    this.isLoading = true;
    const formData = new FormData();
    formData.append('img', this.registerForm.get('img')!.value);
    formData.append('Name', this.registerForm.get('Name')!.value);
    formData.append('Email', this.registerForm.get('Email')!.value);
    formData.append('Phone', this.registerForm.get('Phone')!.value);
    formData.append('Sex', this.registerForm.get('Sex')!.value);
    formData.append(
      'HighestQualification',
      this.registerForm.get('HighestQualification')!.value
    );

    formData.append('PassOfYear', this.registerForm.get('PassOfYear')!.value);
    formData.append('DOB', this.registerForm.get('DOB')!.value);
    formData.append('State', this.registerForm.get('State')!.value);
    formData.append('District', this.registerForm.get('District')!.value);
    formData.append('Post', this.registerForm.get('Post')!.value);
    formData.append('PinCode', this.registerForm.get('PinCode')!.value);
    formData.append('Course', this.registerForm.get('Course')!.value);
    formData.append('Status', this.registerForm.get('Status')!.value);
    formData.append(
      'CreationDate',
      this.registerForm.get('CreationDate')!.value
    );
    formData.append('PaymentDate', this.registerForm.get('PaymentDate')!.value);
    formData.append(
      'ApprovalDate',
      this.registerForm.get('ApprovalDate')!.value
    );
    await this._auth.registerUser(formData).subscribe(
      (response: any) => {
        this.isLoading = false;
        if (response.status) {
          Swal.fire({
            title: 'Good Job💖💖💖',
            timer: 1000,
            text: 'successfully registered please wait for approval',
            icon: 'success',
          }).then(() => {
            this.registerForm.reset();
            this._router.navigate(['/']);
          });
        } else {
          Swal.fire({
            title: '😒😒😒Oops...',
            timer: 1500,
            text: 'Email Already exist!',
            icon: 'error',
          }).then(() => {
            this.ngOnInit();
            window.location.reload();
          });
        }
      },
      (errorMessage) => {
        this.isLoading = false;
        Swal.fire({
          title: '🤦‍♂️🤦‍♂️🤦‍♂️warning!!',
          showConfirmButton: false,
          timer: 1000,
          text: 'some internal error',
          icon: 'error',
        }).then(() => {
          window.location.reload();
        });
      }
    );
  }


  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
      this.registerForm.get('img')!.setValue(this.image);
    }
  }
  //************************************** */
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

  //***********************************jquery **********************************/
  ngOnInit(){}
}
