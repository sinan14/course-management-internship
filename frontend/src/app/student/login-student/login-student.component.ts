import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.css'],
})
export class LoginStudentComponent {
  isLoading: boolean = false;
  passwordReg =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
  emailReg = /^[a-z0-9.%+]+@[a-z09.-]+.[a-z]{2,4}/;
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _fb: FormBuilder
  ) {}

  loginForm = this._fb.group({
    Email: ['', [Validators.pattern(this.emailReg), Validators.required]],
    Password: ['', [Validators.pattern(this.passwordReg), Validators.required]],
  });

  loginUser() {
    this.isLoading = true;
    console.log(this.loginForm.value)
    this._auth.loginStudent(this.loginForm.value).subscribe(
      (response) => {
        this.isLoading = false;
        if (response.status) {
          this.isLoading = false;
          const id = response.id;
          const Name = response.Name;
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('Name', response.id);
          localStorage.setItem('navigator', response.id);
          Swal.fire({
            title: `welcome ${Name}  🥰`,
            icon: 'success',
            timer: 600,
            showConfirmButton: false,
          });
          this._router.navigate([`/students/${id}`]);
        } else {
          this.isLoading = false;
          Swal.fire('Warning!!', 'User not found🤷‍♂️🤷‍♂️🤷‍♀️!', 'error').then(
            (refresh) => {
              this.loginForm.reset();
            }
          );
        }
      },
      (error) => {
        this.isLoading = false;
        Swal.fire({
          title: '🤦‍♂️🤦‍♂️🤦‍♂️internal error',
          text: 'server failed to respond',
          timer: 1500,
          icon: 'error',
        });
      }
    );
  }
}
