import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/auth.service";
import { FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-login-employee",
  templateUrl: "./login-employee.component.html",
  styleUrls: ["./login-employee.component.css"],
})
export class LoginEmployeeComponent implements OnInit {
  isLoading: boolean = false;
  error: string = null;
  passwordReg = /^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/;
  emailReg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.([a-z]{3})+(\.([a-z]{2,}))?$/;
  empReg = /emp/gi;
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {}
  empLoginForm = this._fb.group({
    Email: ["", [Validators.pattern(this.emailReg), Validators.required]],
    Password: ["", [Validators.pattern(this.passwordReg), Validators.required]],
    // emp: ['', [Validators.required, Validators.pattern(this.empReg)]],
  });

  loginUser() {
    if (!this.empLoginForm.valid) {
      return;
    }
    this.isLoading = true;
    this._auth.loginProfessor(this.empLoginForm.value).subscribe(
      (response) => {
        this.isLoading = false;
        if (response.status == "success") {
          this.isLoading = false;
          console.log(response);
          localStorage.setItem("token", response.token);
          localStorage.setItem("role", response.role);
          const Name = "Admin";
          localStorage.setItem("Name", "Admin");
          Swal.fire({
            title: `welcome 🙏🏻🙏🏻🙏🏻`,
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          }).then(() => {
            this._router.navigate(["/admin"]);
          });
        } else {
          this.isLoading = false;
          Swal.fire("Warning!!", "User not found🤷‍♂️🤷‍♂️🤷‍♀️!", "error").then(
            (refresh) => {
              this.empLoginForm.reset();
            }
          );
        }
      },
      (errorMessage) => {
        this.isLoading = false;

        Swal.fire({
          title: "🤦‍♂️🤦‍♂️🤦‍♂️warning!!",
          showConfirmButton: false,
          timer: 1000,
          text: "some internal error",
          icon: "error",
        }).then(() => {
          this.empLoginForm.reset();
        });
      }
    );
  }
}
