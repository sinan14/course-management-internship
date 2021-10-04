import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { CourseService } from "../course.service";

@Component({
  selector: "app-add-course-component",
  templateUrl: "./add-course-component.component.html",
  styleUrls: ["./add-course-component.component.css"],
})
export class AddCourseComponentComponent implements OnInit {
  image: any;
  constructor(
    private _fb: FormBuilder,
    private _courseService: CourseService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
  courseForm = this._fb.group({
    title: ["", Validators.required],
    duration: ["", Validators.required],
    fee: ["", [Validators.required]],
    ageLimit: ["", [Validators.required]],
    description: ["", [Validators.required]],
  });

  async addCourse() {
    if (this.courseForm.invalid) {
      return;
    }
    await this._courseService
      .addCourse(this.courseForm.value)
      .subscribe((response) => {
        if (response) {
          Swal.fire({
            title: "Done",
            text: "course added",
            icon: "success",
            timer: 700,
          }).then(() => {
            // this._router.navigate(["/admin/courses"], {
            //   relativeTo: this.route,
            // });
            this._router.navigate(["/admin/courses"], {
              relativeTo: this._route,
            });
          });
        } else {
          Swal.fire({
            title: "Oh noooo",
            text: "something went wrong",
            icon: "error",
            timer: 700,
          }).then(() => {});
        }
      });
  }
}
