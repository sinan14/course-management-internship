import { AuthService } from '../../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {
  AbstractControl,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  isLoading: boolean = false;
  emailReg = /^[a-z0-9.%+]+@[a-z09.-]+.[a-z]{2,4}/;
  passwordReg =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

  resetForm: FormGroup;

  constructor(private router: Router, private _auth: AuthService) {}
  ngOnInit(): void {
    this.resetForm = new FormGroup({
      Email: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.emailReg),
      ]),
      DOB: new FormControl(null, [Validators.required]),
      Password: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.passwordReg),
      ]),
      CPassword: new FormControl(null, [
        Validators.required,
        this.passValidator,
        Validators.pattern(this.passwordReg),
      ]),
    });
  }
  isValid(controlName) {
    return (
      this.resetForm.get(controlName).invalid &&
      this.resetForm.get(controlName).touched
    );
  }
  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const cnfpassValue = control.value;
      const passControl = control.root.get('Password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfpassValue || passValue === '') {
          return {
            isError: true,
          };
        }
      }
    }

    return null;
  }
  onSubmit() {
    if (!this.resetForm.valid) {
      return;
    }
    this.isLoading = true;

    this._auth.resetStudentPassword(this.resetForm.value).subscribe(
      (response) => {
        this.isLoading = false;
        if (response.status) {
          Swal.fire({
            title: 'Eureka! ',
            text: 'password updated successfully',
            icon: 'success',
            timer: 500,
            showConfirmButton: false,
          }).then(() => {
            this.resetForm.reset();
            this.router.navigate(['/login']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'given email doesnot registered!',
            timer: 1000,
            showConfirmButton: false,
          }).then(() => {
            this.resetForm.reset();
          });
        }
      },
      (catchError) => {
        this.isLoading = false;
        Swal.fire({
          title: 'warning!!',
          showConfirmButton: false,
          timer: 1000,
          text: 'some internal error',
          icon: 'error',
        }).then(() => {
          this.resetForm.reset();
        });
      }
    );
  }
}
