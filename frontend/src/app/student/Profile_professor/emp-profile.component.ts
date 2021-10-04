import { AuthService } from "../../shared/auth.service";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";
import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/st-service/employee.service";
@Component({
  selector: "app-emp-profile",
  templateUrl: "./emp-profile.component.html",
  styleUrls: ["./emp-profile.component.css"],
})
export class EmpProfileComponent implements OnInit {
  id: string;
  professor: any;
  isLoading: boolean = false;
  showEditButton: boolean;
  owner: boolean = false;
  showDeleteButton: boolean;
  readonly: boolean;
  phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  passwordReg =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
  emailReg = /[a-z0-9._%+-]+@[a-z0-9.-]+\.([a-z]{3})+(\.([a-z]{2,}))?$/;

  isOwner() {
    if (this._auth.getId() == this.professor._id) {
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
      (this._auth.getUser() == "admin" || this._auth.getUser() == "professor")
    ) {
      // console.log('true');
      this.showEditButton = true;
    } else {
      this.showDeleteButton = false;
    }
  }

  isAdmin(): void {
    if (this._auth.loggedIn() && this._auth.getUser() == "admin") {
      this.showDeleteButton = true;
    } else {
      this.showDeleteButton = false;
    }
  }

  UpdateForm = new FormGroup({
    DOB: new FormControl(null, [Validators.required]),
    Gender: new FormControl(null, [Validators.required]),
    State: new FormControl(null, [Validators.required]),
    District: new FormControl(null, [Validators.required]),
    Post: new FormControl(null, [Validators.required]),
    PinCode: new FormControl(null, [Validators.required]),
    fname: new FormControl(null, [Validators.required]),
    lname: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(this.emailReg),
    ]),
    phno: new FormControl(null, [
      Validators.required,
      Validators.pattern(this.phoneReg),
    ]),
    qual: new FormControl(null, [Validators.required]),

    skill: new FormControl(null, [Validators.required]),
    course: new FormControl(null, [Validators.required]),
  });
  constructor(
    private _http: HttpClient,
    private _ActivatedRoute: ActivatedRoute,
    private _router: Router,
    private _profService: EmployeeService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this.readonly = true;
    this.id = this._ActivatedRoute.snapshot.params["_id"];
    this.isLoading = true;
    this._profService.fetchEmployee(this.id).subscribe(
      (employeesData: any) => {
        this.isLoading = false;
        console.log(employeesData);
        if (employeesData.error) {
          this.isLoading = false;
          this._router.navigate(["/error"], { state: employeesData });
        }
        //************************************************************* */
        this.professor = JSON.parse(JSON.stringify(employeesData));
        this.UpdateForm.patchValue({
          fname: this.professor.fname,
          lname: this.professor.lname,
          phno: this.professor.phno,
          email: this.professor.email,
          qual: this.professor.qual,
          skill: this.professor.skill,
          desgn: this.professor.desgn,
          course: this.professor.course,
          Gender: this.professor.Gender,
          DOB: this.professor.DOB,
          State: this.professor.State,
          District: this.professor.District,
          Post: this.professor.Post,
          PinCode: this.professor.PinCode,
        });
        console.log(this.UpdateForm.value);
        console.log(this.professor);
        console.log(this.professor._id);
        this.isAllowedToEdit();
        this.isOwner();
        this.isAdmin();
      },
      (errorMessage) => {
        this.isLoading = false;
        this._router.navigate([`/professor`]);
        Swal.fire("🤦‍♂️🤦‍♂️🤦‍♂️danger!!", "some internal error", "error").then(
          (refresh) => {
            this._router.navigate([`/`]);
          }
        );
      }
    );
  }

  updateProfile() {
    this.isLoading = true;
    if (this.UpdateForm.invalid) {
      Swal.fire({
        title: "inalid",
        text: "form is invalid",
        icon: "warning",

        timer: 1000,
        showConfirmButton: false,
      });
      this.isLoading = false;
      return;
    }
    this._profService
      .editEmployee(this.UpdateForm.value, this.professor._id)
      .subscribe(
        (employeesData: any) => {
          this.isLoading = false;
          if (employeesData.error) {
            Swal.fire({
              title: "warning!!",
              text: "something went wrong",
              icon: "error",
              timer: 500,
              showConfirmButton: false,
            }).then((refresh) => {
              this.readonly = !this.readonly;
              this._router.navigate(["/error"], { state: employeesData });
            });
          }
          Swal.fire({
            title: "Good Job 😉😉!!",
            text: "profile updated successfully",
            icon: "success",
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
            title: "danger!!🤦‍♂️🤦‍♂️🤦‍♂️",
            text: "some internal error",
            icon: "error",
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
    return this._profService.deleteEmployee(this.professor._id).subscribe(
      (employeesData) => {
        this.isLoading = false;
        this._router.navigate([`/employees`]);
      },
      (errorMessage) => {
        this.isLoading = false;
        Swal.fire("danger!!", "some internal error", "error").then(
          (refresh) => {
            this._router.navigate(["/"]);
          }
        );
      }
    );
  }
}
