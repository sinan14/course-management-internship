import { AuthService } from "../../shared/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { FormBuilder, Validators } from "@angular/forms";
import { EmployeeService } from "src/app/st-service/employee.service";

@Component({
  selector: "app-employee-form",
  templateUrl: "./employee-form.component.html",
  styleUrls: ["./employee-form.component.css"],
})
export class EmployeeFormComponent implements OnInit {
  isLoading: boolean = false;
  image;
  indianStates: any = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Orissa",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  courses: any = [
    "Full Stack Development",
    "Data Science and Analytics",
    "Robotic Process Automation",
  ];

  ngOnInit() {
    this.courses = [
      "Full Stack Development",
      "Data Science and Analytics",
      "Robotic Process Automation",
    ];
    this.proForm.patchValue({
      Password: "Ict@2021",
      SkillSet: "Java,Js,C++",
    });
  }

  phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  emailReg = /[a-z0-9._%+-]+@[a-z0-9.-]+\.([a-z]{3})+(\.([a-z]{2,}))?$/;

  constructor(
    private _prof: EmployeeService,
    private _fb: FormBuilder,
    private _router: Router
  ) {}
  proForm = this._fb.group({
    img: [""],
    email: ["", Validators.required],
    fname: ["", Validators.required],
    lname: ["", Validators.required],
    comp: ["", Validators.required],
    desgn: ["", Validators.required],
    course: ["", Validators.required],
    qual: ["", Validators.required],
    skill: ["", [Validators.required]],
    address: [""],
    phno: ["", [Validators.required, Validators.pattern(this.phoneReg)]],
    /***
     * !this fields need to be added in schema
     */
    Gender: ["Male", [Validators.required]],
    DOB: ["", Validators.required],
    State: ["", Validators.required],
    District: ["", Validators.required],
    Post: ["", Validators.required],
    PinCode: [
      "",
      [Validators.required, Validators.min(100000), Validators.max(999999)],
    ],
    Password: ["Ict@2021"],
  });

  async registerEmployee() {
    if (this.proForm.invalid) {
      this.isLoading = false;
      return;
    }
    this.isLoading = true;
    console.log(this.proForm.value);
    this.isLoading = true;

    // const formData = new FormData();
    // formData.append("img", this.proForm.get("img")!.value);
    // formData.append("fname", this.proForm.get("fname")!.value);
    // formData.append("lname", this.proForm.get("lname")!.value);
    // formData.append("email", this.proForm.get("email")!.value);
    // formData.append("comp", this.proForm.get("comp")!.value);
    // formData.append("desgn", this.proForm.get("desgn")!.value);
    // formData.append("qual", this.proForm.get("qual")!.value);
    // formData.append("phno", this.proForm.get("phno")!.value);
    // formData.append("address", this.proForm.get("address")!.value);
    // formData.append("Gender", this.proForm.get("Gender")!.value);
    // formData.append("DOB", this.proForm.get("DOB")!.value);
    // formData.append("State", this.proForm.get("State")!.value);
    // formData.append("District", this.proForm.get("District")!.value);
    // formData.append("Post", this.proForm.get("Post")!.value);
    // formData.append("PinCode", this.proForm.get("PinCode")!.value);
    // formData.append("course", this.proForm.get("course")!.value);
    // console.log(formData)
    await this._prof.register(this.proForm.value).subscribe(
      
      (response: any) => {
        this.isLoading = false;
        if (response) {
          Swal.fire({
            title: "Good Job💖💖💖",
            timer: 1000,
            text: "successfully registered",
            icon: "success",
          }).then(() => {
            // this.proForm.reset();
            // this._router.navigate(["/"]);
          });
        } else {
          Swal.fire({
            title: "😒😒😒Oops...",
            timer: 1500,
            text: "Email Already exist!",
            icon: "error",
          }).then(() => {
            // this.ngOnInit();
            // window.location.reload();
          });
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
          window.location.reload();
        });
      }
    );
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
      this.proForm.get("img")!.setValue(this.image);
    }
  }

  //******************************************************************** */
}
